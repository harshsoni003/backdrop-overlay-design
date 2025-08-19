-- Fix function security issues by setting proper search paths

-- Update has_role function with secure search path
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Update is_admin function with secure search path
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(auth.uid(), 'admin'::app_role)
$$;

-- Update existing functions with secure search paths
CREATE OR REPLACE FUNCTION public.handle_new_user_credits()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_credits (user_id, credits_remaining)
  VALUES (NEW.id, 10);
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the user creation
    RAISE WARNING 'Failed to create user credits for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$;

-- Update handle_successful_payment function with secure search path
CREATE OR REPLACE FUNCTION public.handle_successful_payment(user_id_param uuid, payment_type text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF payment_type = 'monthly' THEN
    UPDATE public.user_credits 
    SET 
      monthly_upgrade = true,
      monthly_expires_at = NOW() + INTERVAL '1 month',
      updated_at = NOW()
    WHERE user_id = user_id_param;
  ELSIF payment_type = 'lifetime' THEN
    UPDATE public.user_credits 
    SET 
      lifetime_access = true,
      updated_at = NOW()
    WHERE user_id = user_id_param;
  END IF;
END;
$$;

-- Update has_unlimited_credits function with secure search path
CREATE OR REPLACE FUNCTION public.has_unlimited_credits(user_id_param uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_credits 
    WHERE user_id = user_id_param 
    AND (
      lifetime_access = true 
      OR (monthly_upgrade = true AND monthly_expires_at > NOW())
    )
  );
END;
$$;

-- Update update_user_credits_updated_at function with secure search path
CREATE OR REPLACE FUNCTION public.update_user_credits_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;