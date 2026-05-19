# Frameshift

A Netflix/Prime Video-style portfolio project built with a headless WordPress CMS and a React TypeScript frontend.

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
| Frontend hosting | Netlify (`frameshift.enriquesolis.me`) |

---

## Features

- **Hero section** — featured movie banner with backdrop image and entrance animation
- **Genre rows** — horizontally scrollable rows grouped by genre with fade-in arrow controls
- **Movie cards** — hover scale animation with muted 5-second preview clip autoplay after 800ms
- **Detail modal** — card morphs into a full detail overlay using Framer Motion `layoutId`
- **Search** — filter movies by title at `/search?q=`
- **Movie detail page** — full page view at `/movie/:slug`
- **Page transitions** — `AnimatePresence` wrapping routes for smooth fades
- **Headless CMS** — all movie content managed in WordPress, zero frontend rebuild needed to add content

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

Frontend deploys to Netlify via drag-and-drop of the `dist` folder:

```bash
npm run build
```

Then drag `dist` to [netlify.com/drop](https://netlify.com/drop).
