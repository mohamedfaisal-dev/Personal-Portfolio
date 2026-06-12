-- ================================================================
-- PORTFOLIO CMS — Migration 002: Row Level Security Policies
-- Run this AFTER migration 001
-- ================================================================

-- ─── Enable RLS on all tables ─────────────────────────────────
ALTER TABLE projects          ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages  ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills             ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences        ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements       ENABLE ROW LEVEL SECURITY;

-- ─── PUBLIC READ (visitors can see content) ───────────────────
CREATE POLICY "Public read visible projects"
  ON projects FOR SELECT
  TO anon, authenticated
  USING (is_visible = true);

CREATE POLICY "Public read skills"
  ON skills FOR SELECT
  TO anon, authenticated
  USING (is_visible = true);

CREATE POLICY "Public read experiences"
  ON experiences FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public read achievements"
  ON achievements FOR SELECT
  TO anon, authenticated
  USING (true);

-- ─── CONTACT: public can INSERT only ──────────────────────────
CREATE POLICY "Public insert contact message"
  ON contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- ─── ADMIN FULL ACCESS (authenticated = you logged in) ────────
CREATE POLICY "Admin full access projects"
  ON projects FOR ALL
  TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access messages"
  ON contact_messages FOR ALL
  TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access skills"
  ON skills FOR ALL
  TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access experiences"
  ON experiences FOR ALL
  TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access achievements"
  ON achievements FOR ALL
  TO authenticated
  USING (true) WITH CHECK (true);
