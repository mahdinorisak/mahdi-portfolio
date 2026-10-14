# Mahdi Nor Isak | Portfolio

My personal portfolio website, with an admin dashboard to edit everything without touching code.

**Live site:** https://mahdi-portfolio-81l3.vercel.app

## Tech stack

| Area | Tools |
|---|---|
| Framework | Next.js 14 (App Router) |
| UI | React 18 |
| Styling | Tailwind CSS 3 |
| Language | JavaScript |
| Database, login, file storage | Supabase (Postgres, Auth, Storage, Edge Functions) |
| Email alerts | Resend |
| Hosting | Vercel |

## Features

- Responsive one-page portfolio: home, about, skills, projects, experience and contact
- Light, Dark and System themes, with the choice remembered
- Admin Studio at /admin: edit all content, upload photo, CV and project screenshots, change colours with a live preview
- Contact form that saves messages to an Inbox and emails an alert
- Images are shrunk automatically before upload
- SEO: sitemap, robots file, link-preview image and structured data
- Accessible: keyboard navigation, visible focus, reduced-motion support
- Security: database row-level rules, so only the admin email can edit

## Run it locally

You need Node.js 18.17 or newer and a Supabase project.

    npm install
    npm run dev

Create a file named .env.local with:

    NEXT_PUBLIC_SUPABASE_URL=your-project-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-publishable-key

Then open http://localhost:3000.

## Deploy

Push to the main branch and Vercel redeploys automatically.