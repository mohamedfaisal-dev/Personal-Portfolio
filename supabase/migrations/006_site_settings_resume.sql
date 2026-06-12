-- Site settings (singleton) — CMS-managed resume download
CREATE TABLE IF NOT EXISTS site_settings (
  id               int PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  resume_url       text NOT NULL DEFAULT '/Mohamed_Faisal_Resume.pdf',
  resume_filename  text NOT NULL DEFAULT 'Mohamed_Faisal_Resume.pdf',
  updated_at       timestamptz DEFAULT now()
);

INSERT INTO site_settings (id, resume_url, resume_filename)
VALUES (1, '/Mohamed_Faisal_Resume.pdf', 'Mohamed_Faisal_Resume.pdf')
ON CONFLICT (id) DO NOTHING;

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read site settings"
  ON site_settings FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admin full access site settings"
  ON site_settings FOR ALL
  TO authenticated
  USING (true) WITH CHECK (true);

-- Resume PDF storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public view resumes"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'resumes');

CREATE POLICY "Admin manage resumes"
  ON storage.objects FOR ALL
  TO authenticated
  USING (bucket_id = 'resumes')
  WITH CHECK (bucket_id = 'resumes');
