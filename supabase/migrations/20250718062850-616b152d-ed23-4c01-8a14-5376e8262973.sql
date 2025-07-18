-- Remove the foreign key constraint that's causing errors
ALTER TABLE public.user_credits DROP CONSTRAINT IF EXISTS user_credits_user_id_fkey;