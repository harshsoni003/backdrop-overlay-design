-- Add INSERT policy for user_credits so users can create their own credits record
CREATE POLICY "Users can create their own credits" 
ON public.user_credits 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Enable realtime for user_credits table
ALTER TABLE public.user_credits REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_credits;