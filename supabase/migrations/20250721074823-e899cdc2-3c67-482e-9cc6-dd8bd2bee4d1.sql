-- Add subscription expiry tracking to user_credits table
ALTER TABLE public.user_credits 
ADD COLUMN monthly_expires_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN lifetime_access BOOLEAN NOT NULL DEFAULT false;

-- Create function to check if user has unlimited credits
CREATE OR REPLACE FUNCTION public.has_unlimited_credits(user_id_param UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
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

-- Create function to handle successful payment webhook
CREATE OR REPLACE FUNCTION public.handle_successful_payment(
  user_id_param UUID,
  payment_type TEXT
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
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