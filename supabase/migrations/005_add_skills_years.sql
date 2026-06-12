-- Add years-of-experience column to skills (displayed as "1+ Year" on site)
ALTER TABLE skills
  ADD COLUMN IF NOT EXISTS years int DEFAULT 1 CHECK (years >= 1);

UPDATE skills SET years = 1 WHERE years IS NULL;

UPDATE achievements SET value = 1 WHERE label = 'Years Experience';

INSERT INTO skills (sort_order, name, category, icon_key, proficiency, years)
SELECT 21, 'AWS S3 Bucket', 'DevOps', 'AWS S3 Bucket', 88, 1
WHERE NOT EXISTS (
  SELECT 1 FROM skills WHERE lower(name) IN ('aws s3 bucket', 'amazon s3', 's3', 'aws s3')
);
