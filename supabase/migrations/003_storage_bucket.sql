-- ================================================================
-- PORTFOLIO CMS — Migration 003: Storage Bucket Policies
-- NOTE: First create the bucket manually:
--   Dashboard → Storage → New Bucket → "project-images" → Public ON
-- Then run this SQL for the policies:
-- ================================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

-- Anyone can view images
CREATE POLICY "Public view project images"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'project-images');

-- Only admin (authenticated) can upload/delete
CREATE POLICY "Admin manage project images"
  ON storage.objects FOR ALL
  TO authenticated
  USING (bucket_id = 'project-images')
  WITH CHECK (bucket_id = 'project-images');
