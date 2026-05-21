# Frameshift

[![Deploy to Hostinger](https://github.com/esolis83/frameshift/actions/workflows/deploy.yml/badge.svg)](https://github.com/esolis83/frameshift/actions/workflows/deploy.yml)

A headless WordPress + React TypeScript streaming-service portfolio project.

**Live site:** [frameshift.enriquesolis.me](https://frameshift.enriquesolis.me)

---

## What it is

Frameshift is a full-stack portfolio piece that demonstrates headless CMS architecture, REST API integration, and a polished streaming-service UI. Movie content is managed in WordPress and served via the WP REST API to a React frontend with smooth Framer Motion animations.

---

## Tech stack

| Layer | Technology |
|---|---|
| CMS | WordPress + Advanced Custom Fields (ACF) |
| Frontend | React 18 + TypeScript + Vite 5 |
| Routing | React Router v6 |
| Data fetching | TanStack Query v5 |
| State | Zustand |
| Animation | Framer Motion |
| Styling | CSS Modules + CSS custom properties |
| CMS hosting | Hostinger (`frameshiftcms.enriquesolis.me`) |
| Frontend hosting | Hostinger (`frameshift.enriquesolis.me`) |
| CI/CD | GitHub Actions → FTP deploy |

---

## Features

- **Intro animation** — typewriter types FRAME then SHIFT, words slide together, logo flies to NavBar
- **Hero section** — featured movie banner with frosted glass panel and entrance animation
- **Genre rows** — horizontally scrollable rows with staggered card entrance animations
- **Movie cards** — widescreen 16:9, hover glow, Top Rated badge on high-rated titles
- **Detail modal** — card morphs into a full detail overlay using Framer Motion `layoutId`
- **Search** — filter movies by title or genre at `/search?q=`
- **Movie detail page** — full page at `/movie/:slug` with cast and trailer embed
- **Page transitions** — `AnimatePresence` wrapping routes for smooth fades
- **Headless CMS** — all movie content managed in WordPress, zero frontend rebuild needed
- **Mobile responsive** — glassmorphism adapts across all screen sizes

---

## Architecture

```
WordPress REST API (frameshiftcms.enriquesolis.me)
        ↓
src/api/wordpress.ts  ← maps WP response to Movie interface
        ↓
TanStack Query hooks  ← caching + loading/error states
        ↓
React components      ← UI rendering
```

A `VITE_USE_MOCK` environment variable toggles between live WordPress data and local mock data for development.

---

## Local development

```bash
npm install
```

Create a `.env.local` file:
```
VITE_USE_MOCK=true
VITE_WP_BASE_URL=https://frameshiftcms.enriquesolis.me/wp-json/wp/v2
```

```bash
npm run dev
```

---

## Deployment

GitHub Actions builds on every push to `main` and deploys to Hostinger via FTP automatically.
