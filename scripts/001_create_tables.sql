-- Create profiles table for user management
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  technologies TEXT[] NOT NULL,
  github_url TEXT,
  live_url TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create analytics table for tracking page views
CREATE TABLE IF NOT EXISTS public.analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path TEXT NOT NULL,
  visitor_id TEXT,
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create resume_files table
CREATE TABLE IF NOT EXISTS public.resume_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  blob_url TEXT NOT NULL,
  file_size INTEGER,
  is_active BOOLEAN DEFAULT TRUE,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_files ENABLE ROW LEVEL SECURITY;

-- Profiles policies (admin only)
CREATE POLICY "profiles_select_admin" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_update_admin" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Projects policies (public read, admin write)
CREATE POLICY "projects_select_all" ON public.projects
  FOR SELECT USING (TRUE);

CREATE POLICY "projects_insert_admin" ON public.projects
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "projects_update_admin" ON public.projects
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "projects_delete_admin" ON public.projects
  FOR DELETE USING (auth.role() = 'authenticated');

-- Blog posts policies (public read published, admin full access)
CREATE POLICY "blog_posts_select_published" ON public.blog_posts
  FOR SELECT USING (published = TRUE OR auth.role() = 'authenticated');

CREATE POLICY "blog_posts_insert_admin" ON public.blog_posts
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "blog_posts_update_admin" ON public.blog_posts
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "blog_posts_delete_admin" ON public.blog_posts
  FOR DELETE USING (auth.role() = 'authenticated');

-- Contact messages policies (insert public, read admin)
CREATE POLICY "contact_messages_insert_all" ON public.contact_messages
  FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "contact_messages_select_admin" ON public.contact_messages
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "contact_messages_update_admin" ON public.contact_messages
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "contact_messages_delete_admin" ON public.contact_messages
  FOR DELETE USING (auth.role() = 'authenticated');

-- Analytics policies (insert all, read admin)
CREATE POLICY "analytics_insert_all" ON public.analytics
  FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "analytics_select_admin" ON public.analytics
  FOR SELECT USING (auth.role() = 'authenticated');

-- Resume files policies (read all, write admin)
CREATE POLICY "resume_files_select_all" ON public.resume_files
  FOR SELECT USING (TRUE);

CREATE POLICY "resume_files_insert_admin" ON public.resume_files
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "resume_files_update_admin" ON public.resume_files
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "resume_files_delete_admin" ON public.resume_files
  FOR DELETE USING (auth.role() = 'authenticated');
