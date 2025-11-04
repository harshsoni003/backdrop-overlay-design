-- Create storage bucket for custom backgrounds
INSERT INTO storage.buckets (id, name, public)
VALUES ('custom-backgrounds', 'custom-backgrounds', true);

-- Allow anyone to view custom backgrounds
CREATE POLICY "Anyone can view custom backgrounds"
ON storage.objects
FOR SELECT
USING (bucket_id = 'custom-backgrounds');

-- Allow authenticated users to upload custom backgrounds
CREATE POLICY "Authenticated users can upload custom backgrounds"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'custom-backgrounds' AND auth.role() = 'authenticated');

-- Allow users to delete their own uploads
CREATE POLICY "Users can delete their own custom backgrounds"
ON storage.objects
FOR DELETE
USING (bucket_id = 'custom-backgrounds' AND auth.uid()::text = (storage.foldername(name))[1]);