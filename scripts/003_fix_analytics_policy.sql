-- Drop existing analytics policies
DROP POLICY IF EXISTS "analytics_insert_all" ON public.analytics;
DROP POLICY IF EXISTS "analytics_select_admin" ON public.analytics;

-- Create new analytics policies that explicitly allow anonymous inserts
CREATE POLICY "analytics_insert_public" ON public.analytics
  FOR INSERT WITH CHECK (true);

CREATE POLICY "analytics_select_admin" ON public.analytics
  FOR SELECT USING (auth.role() = 'authenticated');

-- Also ensure the table allows anonymous access
GRANT INSERT ON public.analytics TO anon;
GRANT SELECT ON public.analytics TO authenticated;
