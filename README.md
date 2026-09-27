# Eskedar Nigussie — Portfolio (React + Express + PostgreSQL)

Rebuilt from the original TanStack Start version into a plain **React**
(Vite) frontend and a separate **Express + PostgreSQL** backend, talking to
each other over a small JSON API.

```
mern-portfolio/
├── frontend/   React + Vite + TypeScript + Tailwind — the site itself
└── backend/    Express + PostgreSQL (pg) — powers the contact form
```

## What changed from the original

- Fixed a broken import (`project-tasks.jpg`, a file that didn't exist) that
  would have crashed the production build.
- The contact form now actually works: it POSTs to a real API, saves the
  message in PostgreSQL, and can optionally email you a notification.
  Before, it just flipped a bit of UI state and threw the message away.
- Images were compressed and converted to WebP (5.5MB → ~160KB total).
- Removed an unused leftover image (`lms.png`) and duplicate asset files.
- Added a favicon, Open Graph/Twitter preview image, `robots.txt`, and a
  canonical URL — previously there was no favicon and no social preview.
- Removed a duplicate Google Fonts `<link>` (it was being loaded twice).
- Centralized your email/GitHub/LinkedIn into one `siteConfig.ts` file
  instead of three separate copies.
- Added a "Resume" download button to the nav (see note below).
- Added basic rate-limiting to the contact endpoint against spam.
- Fixed a Tailwind v4 config bug (`@source` pointed at a nonexistent
  `src/src` folder) that made the whole site render with zero styling.

## 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:

- `DATABASE_URL` — a PostgreSQL connection string. Free hosted options:
  [Neon](https://neon.tech), [Supabase](https://supabase.com), or
  [Render Postgres](https://render.com/docs/databases). Or run Postgres
  locally and use `postgres://postgres:yourpassword@localhost:5432/portfolio`.
- `PGSSL` — leave as `true` for hosted Postgres. Set to `false` only if
  you're connecting to a local database without SSL.
- `CORS_ORIGIN` — the frontend's URL (`http://localhost:5173` for local dev).
- SMTP fields are **optional**. Leave them blank and contact messages will
  still be saved in Postgres, just without an email notification. If you do
  want email alerts, a Gmail "App Password" or a free
  [Resend](https://resend.com)/[Brevo](https://www.brevo.com) SMTP account
  both work with these fields.
- `ADMIN_KEY` — optional, but if you set it you can read saved messages back
  by calling `GET /api/contact` with an `x-admin-key` header matching it.

Run it:

```bash
npm run dev
```

The API starts on `http://localhost:5000` (health check at `/api/health`).
It creates the `messages` table automatically on first startup — no manual
migration needed.

## 2. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env   # only needed if backend isn't on localhost:5000
npm run dev
```

Opens on `http://localhost:5173`. In dev, API calls to `/api/*` are proxied
to `http://localhost:5000` automatically (see `vite.config.ts`), so you
don't need to set `VITE_API_URL` locally.

## 3. Add your resume

Drop your PDF resume at `frontend/public/resume.pdf` — the "Resume" button
in the nav links to `/resume.pdf` and won't work until that file exists.

## 4. Deploying

- **Frontend**: any static host (Netlify, Vercel, Cloudflare Pages). Build
  with `npm run build` inside `frontend/`, deploy the `dist/` folder. Set
  `VITE_API_URL` to your deployed backend's URL as an environment variable
  before building.
- **Backend**: any Node host (Render, Railway, Fly.io). Set the same
  environment variables from `.env` in your host's dashboard — **never**
  commit your real `.env` file. Point `DATABASE_URL` at your hosted Postgres
  instance and `CORS_ORIGIN` at your deployed frontend's URL.

## Notes

- Contact form messages are stored in a PostgreSQL `messages` table
  (columns: `id`, `name`, `email`, `subject`, `message`, `read`,
  `created_at`).
- The old TanStack Start / server-rendering setup, `dist/` build artifacts,
  and unused deploy configs (`wrangler.jsonc`, multiple hosting configs)
  from the original zip were dropped — this is a plain SPA + API now, so
  pick one static host and one Node host rather than juggling three.
