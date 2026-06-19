-- ═══════════════════════════════════════════════════════════════════════════
-- VOCI HUB — Complete Database Schema
-- Run this in your Supabase SQL Editor:
-- https://supabase.com → Your Project → SQL Editor → New Query → Paste → Run
-- ═══════════════════════════════════════════════════════════════════════════

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── PROFILES ──────────────────────────────────────────────────────────────
-- Extends Supabase auth.users with VOCI-specific data
CREATE TABLE IF NOT EXISTS profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  email         TEXT NOT NULL,
  avatar        TEXT,                          -- 2-letter initials e.g. "BI"
  role          TEXT DEFAULT 'Member',
  sphere        TEXT,
  campus        TEXT DEFAULT 'Murang''a University of Technology',
  cohort        INTEGER DEFAULT 1,
  level         INTEGER DEFAULT 1 CHECK (level BETWEEN 1 AND 5),
  level_name    TEXT DEFAULT 'Explorer',
  bio           TEXT,
  uvp           TEXT,                          -- Unique Value Proposition
  values        TEXT[],                        -- Array of core values
  xp            INTEGER DEFAULT 0,
  streak        INTEGER DEFAULT 0,
  join_date     DATE DEFAULT CURRENT_DATE,
  mentor_id     UUID REFERENCES profiles(id),
  mentee_id     UUID REFERENCES profiles(id),
  peer_id       UUID REFERENCES profiles(id),
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── WINS FEED ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS wins (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content       TEXT NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS win_likes (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  win_id        UUID NOT NULL REFERENCES wins(id) ON DELETE CASCADE,
  user_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(win_id, user_id)
);

-- ── SESSIONS ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS sessions (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title         TEXT NOT NULL,
  pillar        TEXT,
  session_type  TEXT,
  facilitator   TEXT,
  session_date  DATE NOT NULL,
  session_time  TEXT,
  platform      TEXT DEFAULT 'Zoom',
  platform_link TEXT,
  status        TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'completed', 'cancelled')),
  attendees     INTEGER DEFAULT 0,
  rating        NUMERIC(3,1),
  notes         TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS session_attendees (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id    UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  user_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  attended      BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(session_id, user_id)
);

-- ── ANNOUNCEMENTS ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS announcements (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title         TEXT NOT NULL,
  body          TEXT NOT NULL,
  author        TEXT NOT NULL,
  type          TEXT DEFAULT 'announcement' CHECK (type IN ('event', 'resource', 'recruitment', 'announcement')),
  urgent        BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── ACTION PLAN TASKS ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS action_plan_tasks (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  week          INTEGER NOT NULL CHECK (week BETWEEN 1 AND 4),
  theme         TEXT,
  action        TEXT NOT NULL,
  done          BOOLEAN DEFAULT FALSE,
  due_date      TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── MENTORSHIP SESSIONS ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS mentorship_sessions (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mentor_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  mentee_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  session_date  DATE NOT NULL,
  topic         TEXT,
  notes         TEXT,
  grow_goal     TEXT,
  grow_reality  TEXT,
  grow_options  TEXT,
  grow_way      TEXT,
  status        TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'completed', 'cancelled')),
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── IMPACT PROJECTS ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS impact_projects (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title           TEXT NOT NULL,
  description     TEXT,
  sphere          TEXT,
  status          TEXT DEFAULT 'Planning' CHECK (status IN ('Planning', 'In Progress', 'Active', 'Completed')),
  beneficiaries   INTEGER DEFAULT 0,
  start_date      TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── NOTIFICATIONS ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS notifications (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  text          TEXT NOT NULL,
  read          BOOLEAN DEFAULT FALSE,
  type          TEXT DEFAULT 'info',
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── PILLAR PROGRESS ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS pillar_progress (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  pillar_number   INTEGER NOT NULL CHECK (pillar_number BETWEEN 1 AND 5),
  modules_total   INTEGER DEFAULT 4,
  modules_done    INTEGER DEFAULT 0,
  progress_pct    INTEGER DEFAULT 0,
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, pillar_number)
);

-- ═══════════════════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY (RLS) — Critical for data protection
-- ═══════════════════════════════════════════════════════════════════════════

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE wins ENABLE ROW LEVEL SECURITY;
ALTER TABLE win_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_attendees ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE action_plan_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentorship_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE impact_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE pillar_progress ENABLE ROW LEVEL SECURITY;

-- Profiles: anyone can read, only owner can update
CREATE POLICY "Profiles are viewable by all members" ON profiles FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Wins: all members can read, authenticated can insert
CREATE POLICY "Wins viewable by all members" ON wins FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Members can post wins" ON wins FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Win likes: all can read, authenticated can insert/delete own
CREATE POLICY "Likes viewable by all" ON win_likes FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Members can like" ON win_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Members can unlike" ON win_likes FOR DELETE USING (auth.uid() = user_id);

-- Sessions: all members can read
CREATE POLICY "Sessions viewable by all members" ON sessions FOR SELECT USING (auth.role() = 'authenticated');

-- Announcements: all members can read
CREATE POLICY "Announcements viewable by all members" ON announcements FOR SELECT USING (auth.role() = 'authenticated');

-- Action plan: only owner can read/write
CREATE POLICY "Tasks viewable by owner" ON action_plan_tasks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Tasks insertable by owner" ON action_plan_tasks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Tasks updatable by owner" ON action_plan_tasks FOR UPDATE USING (auth.uid() = user_id);

-- Mentorship: participants can read their own sessions
CREATE POLICY "Mentorship sessions viewable by participants" ON mentorship_sessions
  FOR SELECT USING (auth.uid() = mentor_id OR auth.uid() = mentee_id);
CREATE POLICY "Mentorship sessions updatable by participants" ON mentorship_sessions
  FOR UPDATE USING (auth.uid() = mentor_id OR auth.uid() = mentee_id);
CREATE POLICY "Mentorship sessions insertable by authenticated" ON mentorship_sessions
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Impact projects: all can read, owner can write
CREATE POLICY "Impact projects viewable by all" ON impact_projects FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Impact projects insertable by owner" ON impact_projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Impact projects updatable by owner" ON impact_projects FOR UPDATE USING (auth.uid() = user_id);

-- Notifications: only owner can read/update
CREATE POLICY "Notifications viewable by owner" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Notifications updatable by owner" ON notifications FOR UPDATE USING (auth.uid() = user_id);

-- Pillar progress: all can read, owner can write
CREATE POLICY "Pillar progress viewable by all" ON pillar_progress FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Pillar progress writable by owner" ON pillar_progress FOR ALL USING (auth.uid() = user_id);

-- ═══════════════════════════════════════════════════════════════════════════
-- FUNCTIONS & TRIGGERS
-- ═══════════════════════════════════════════════════════════════════════════

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, name, email, avatar)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'avatar', upper(left(COALESCE(NEW.raw_user_meta_data->>'name', NEW.email), 2)))
  );

  -- Create default action plan tasks
  INSERT INTO action_plan_tasks (user_id, week, theme, action, due_date) VALUES
    (NEW.id, 1, 'Connect', 'Complete VOCI Profile Page and share with peer partner', 'Week 1'),
    (NEW.id, 1, 'Connect', 'Follow VOCI on Instagram and LinkedIn. Introduce in WhatsApp group', 'Week 1'),
    (NEW.id, 2, 'Discover', 'Complete Personal Brand Foundation Statement', 'Week 2'),
    (NEW.id, 2, 'Discover', 'Write three-format bio (long, short, social)', 'Week 2'),
    (NEW.id, 3, 'Develop', 'Deliver 2-minute self-introduction to 3 different audiences', 'Week 3'),
    (NEW.id, 3, 'Develop', 'Post first branded content on LinkedIn or Instagram', 'Week 3'),
    (NEW.id, 4, 'Commit', 'Complete Participant Self-Assessment Form for Pillar 1', 'Week 4'),
    (NEW.id, 4, 'Commit', 'Sign and share 30-Day Commitment Card with peer partner', 'Week 4');

  -- Create default pillar progress
  INSERT INTO pillar_progress (user_id, pillar_number, modules_total, modules_done, progress_pct) VALUES
    (NEW.id, 1, 4, 0, 0),
    (NEW.id, 2, 4, 0, 0),
    (NEW.id, 3, 4, 0, 0),
    (NEW.id, 4, 3, 0, 0),
    (NEW.id, 5, 4, 0, 0);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Auto-update XP when task is completed
CREATE OR REPLACE FUNCTION update_xp_on_task()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.done = TRUE AND OLD.done = FALSE THEN
    UPDATE profiles SET xp = xp + 50 WHERE id = NEW.user_id;
  ELSIF NEW.done = FALSE AND OLD.done = TRUE THEN
    UPDATE profiles SET xp = GREATEST(0, xp - 50) WHERE id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_task_completed
  AFTER UPDATE ON action_plan_tasks
  FOR EACH ROW EXECUTE FUNCTION update_xp_on_task();

-- Auto-update XP when win is posted
CREATE OR REPLACE FUNCTION update_xp_on_win()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE profiles SET xp = xp + 100 WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_win_posted
  AFTER INSERT ON wins
  FOR EACH ROW EXECUTE FUNCTION update_xp_on_win();

-- ═══════════════════════════════════════════════════════════════════════════
-- SEED DATA — Run after schema creation
-- ═══════════════════════════════════════════════════════════════════════════

-- Sessions
INSERT INTO sessions (title, pillar, session_type, facilitator, session_date, session_time, platform, status, attendees) VALUES
  ('Evaluating Your UVP — Cohort 1 Alignment Session', 'All Pillars', 'Special Session', 'Brian Ingwee', '2026-06-21', '8:00 PM – 9:30 PM', 'Zoom', 'upcoming', 42),
  ('Module 4: Digital & Media Communication', 'Communication', 'Pillar 1', 'Hopewin Adams', '2026-06-24', '7:00 PM – 8:30 PM', 'Google Meet', 'upcoming', 38),
  ('Module 3: Sphere-Specific Mentorship', 'Mentorship', 'Pillar 4', 'Martin Gitau', '2026-06-25', '6:00 PM – 7:30 PM', 'Zoom', 'upcoming', 35),
  ('Module 3: Resilience & Emotional Intelligence', 'Leadership', 'Pillar 3', 'Brian Ingwee', '2026-06-15', '8:00 PM – 9:30 PM', 'Zoom', 'completed', 44),
  ('Module 3: Networking & Relationship Building', 'Personal Branding', 'Pillar 2', 'Sandra Mutanu', '2026-06-13', '7:00 PM – 8:30 PM', 'Google Meet', 'completed', 40);

-- Announcements
INSERT INTO announcements (title, body, author, type, urgent) VALUES
  ('UVP Alignment Session This Sunday!', 'Join us this Sunday, June 21st at 8:00 PM for our special Cohort 1 Alignment Session. Come with openness and a readiness for growth.', 'Brian Ingwee', 'event', TRUE),
  ('VOCI Strategic Plan 2025–2030 Released', 'The full VOCI Strategic Plan is now available in the Training Library. Read it, own it, and let it shape your sphere leadership journey.', 'VOCI ELT', 'resource', FALSE),
  ('Cohort 2 Recruitment Begins July 1st', 'We are opening applications for Cohort 2! Every Cohort 1 member is challenged to bring at least 2 new members. Share the VOCI story.', 'Martin Gitau', 'recruitment', FALSE),
  ('Business Hub Pitch Competition — June 28th', 'The Business Hub is hosting its first Pitch Competition. All members with business ideas are invited to participate. Register via WhatsApp.', 'Zack Njenga', 'event', FALSE);