-- Create reviews table for verified testimonials
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  linkedin_url TEXT,
  verified BOOLEAN DEFAULT FALSE,
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create availability_settings table for calendar management
CREATE TABLE IF NOT EXISTS public.availability_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL UNIQUE,
  time_slot TEXT NOT NULL,
  available BOOLEAN DEFAULT TRUE,
  notes TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.availability_settings ENABLE ROW LEVEL SECURITY;

-- Reviews policies (public insert, admin approve)
CREATE POLICY "reviews_insert_all" ON public.reviews
  FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "reviews_select_approved" ON public.reviews
  FOR SELECT USING (approved = TRUE OR auth.role() = 'authenticated');

CREATE POLICY "reviews_update_admin" ON public.reviews
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "reviews_delete_admin" ON public.reviews
  FOR DELETE USING (auth.role() = 'authenticated');

-- Availability settings policies (public read, admin write)
CREATE POLICY "availability_select_all" ON public.availability_settings
  FOR SELECT USING (TRUE);

CREATE POLICY "availability_insert_admin" ON public.availability_settings
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "availability_update_admin" ON public.availability_settings
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "availability_delete_admin" ON public.availability_settings
  FOR DELETE USING (auth.role() = 'authenticated');
