# Eskedar Nigussie — Portfolio (React + Express + PostgreSQL)

A personal portfolio site: a **React** (Vite) frontend paired with a
separate **Express + PostgreSQL** backend, talking to each other over a
small JSON API.

```
mern-portfolio/
├── frontend/   React + Vite + TypeScript + Tailwind — the site itself
└── backend/    Express + PostgreSQL (pg) — powers the contact form
```

## Features

- Contact form that POSTs to a real API, saves the message in PostgreSQL,
  and can optionally email a notification.
- Basic rate-limiting on the contact endpoint against spam.
- Optimized WebP images.
- Favicon, Open Graph/Twitter preview image, `robots.txt`, and a canonical
  URL for sharing/SEO.
- Site contact info (email/GitHub/LinkedIn) centralized in one
  `siteConfig.ts` file.
- Resume download button in the nav.

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
