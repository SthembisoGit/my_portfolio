-- Insert sample projects
INSERT INTO public.projects (title, description, long_description, technologies, github_url, live_url, featured, order_index) VALUES
(
  'E-Commerce Platform',
  'Full-stack e-commerce solution with payment integration',
  'A comprehensive e-commerce platform built with modern web technologies. Features include product catalog, shopping cart, secure checkout with Stripe integration, order management, and admin dashboard. Implemented responsive design and optimized for performance.',
  ARRAY['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
  'https://github.com/sthembiso/ecommerce',
  'https://ecommerce-demo.vercel.app',
  TRUE,
  1
),
(
  'Task Management System',
  'Collaborative project management tool with real-time updates',
  'A real-time task management application that enables teams to collaborate effectively. Features include kanban boards, task assignments, due dates, comments, file attachments, and real-time notifications using WebSockets.',
  ARRAY['Next.js', 'TypeScript', 'Supabase', 'WebSockets'],
  'https://github.com/sthembiso/taskmanager',
  'https://taskmanager-demo.vercel.app',
  TRUE,
  2
),
(
  'Weather Dashboard',
  'Real-time weather application with location-based forecasts',
  'An intuitive weather dashboard that provides current conditions and 7-day forecasts. Integrates with OpenWeather API, features location search, geolocation support, and beautiful data visualizations using charts.',
  ARRAY['React', 'TypeScript', 'OpenWeather API', 'Chart.js'],
  'https://github.com/sthembiso/weather-app',
  'https://weather-dashboard-demo.vercel.app',
  FALSE,
  3
),
(
  'Social Media Analytics',
  'Analytics dashboard for social media metrics',
  'A comprehensive analytics platform for tracking social media performance across multiple platforms. Features include engagement metrics, audience insights, content performance tracking, and exportable reports.',
  ARRAY['Vue.js', 'Python', 'FastAPI', 'PostgreSQL', 'D3.js'],
  'https://github.com/sthembiso/social-analytics',
  NULL,
  TRUE,
  4
);

-- Insert sample blog post
INSERT INTO public.blog_posts (title, slug, excerpt, content, published, published_at) VALUES
(
  'Building Scalable Web Applications',
  'building-scalable-web-applications',
  'Learn the key principles and best practices for building web applications that scale.',
  '# Building Scalable Web Applications\n\nScalability is crucial for modern web applications. In this post, I''ll share insights from my experience building production-ready applications.\n\n## Key Principles\n\n1. **Database Optimization**: Use proper indexing and query optimization\n2. **Caching Strategies**: Implement Redis for frequently accessed data\n3. **Load Balancing**: Distribute traffic across multiple servers\n4. **Microservices**: Break down monolithic applications into manageable services\n\n## Conclusion\n\nBuilding scalable applications requires careful planning and the right architecture choices.',
  TRUE,
  NOW()
);
