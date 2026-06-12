-- ================================================================
-- PORTFOLIO CMS — Migration 001: Create All Tables
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ================================================================

-- ─── 1. PROJECTS ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
  id              bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  sort_order      int DEFAULT 0,
  title           text NOT NULL,
  category        text NOT NULL DEFAULT 'Web Application',
  image           text NOT NULL DEFAULT '',
  tech            text[] NOT NULL DEFAULT '{}',
  overview        text NOT NULL DEFAULT '',
  demo_url        text NOT NULL DEFAULT '#',
  github_url      text,
  app_store_url   text,
  play_store_url  text,
  problem         text NOT NULL DEFAULT '',
  solution        text NOT NULL DEFAULT '',
  features        text[] NOT NULL DEFAULT '{}',
  is_featured     boolean DEFAULT false,
  is_visible      boolean DEFAULT true,
  created_at      timestamptz DEFAULT now(),
  updated_at      timestamptz DEFAULT now()
);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ─── 2. CONTACT MESSAGES ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_messages (
  id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name        text NOT NULL,
  email       text NOT NULL,
  subject     text NOT NULL,
  message     text NOT NULL,
  is_read     boolean DEFAULT false,
  created_at  timestamptz DEFAULT now()
);

-- ─── 3. SKILLS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS skills (
  id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name        text NOT NULL,
  category    text NOT NULL DEFAULT 'Frontend',
  icon_key    text,
  proficiency int DEFAULT 80 CHECK (proficiency BETWEEN 0 AND 100),
  years       int DEFAULT 1 CHECK (years >= 1),
  sort_order  int DEFAULT 0,
  is_visible  boolean DEFAULT true
);

-- ─── 4. EXPERIENCES ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS experiences (
  id           bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  company      text NOT NULL,
  role         text NOT NULL,
  start_date   text NOT NULL,
  end_date     text,
  location     text,
  description  text NOT NULL DEFAULT '',
  tech         text[] DEFAULT '{}',
  sort_order   int DEFAULT 0
);

-- ─── 5. ACHIEVEMENTS ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS achievements (
  id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  label       text NOT NULL,
  value       int NOT NULL DEFAULT 0,
  suffix      text DEFAULT '+',
  icon        text DEFAULT 'Star',
  sort_order  int DEFAULT 0
);
