# Frameshift — Netflix-style Portfolio Project

## Project overview
A headless WordPress + React TypeScript app that looks and feels like Netflix/Prime Video.
Showcases: headless CMS setup, REST API integration, React Router v6, TypeScript, Framer Motion animations, and a custom streaming-service theme.

## Hosting architecture
| What | Where | URL |
|---|---|---|
| WordPress (headless CMS only) | Hostinger subdomain | `cms.enriquesolis.me` |
| React app | Vercel | `frameshift.enriquesolis.me` |

- WordPress REST API base: `https://cms.enriquesolis.me/wp-json/wp/v2`
- Vercel env var: `VITE_WP_BASE_URL=https://cms.enriquesolis.me/wp-json/wp/v2`
- CORS: install "WP CORS" or "Headers by Matt Gibbs" plugin on WordPress, allow `frameshift.enriquesolis.me`
- DNS: add CNAME record in Hostinger → `frameshift.enriquesolis.me` → Vercel

## Tech stack
- **CMS**: WordPress (Hostinger) + Advanced Custom Fields (ACF)
- **Frontend**: React 18 + TypeScript + Vite 5
- **Routing**: React Router v6 (file-based structure)
- **Data fetching**: TanStack Query v5
- **State**: Zustand (active movie, modal state)
- **Animation**: Framer Motion
- **Styling**: CSS custom properties + CSS Modules (no Tailwind — keep bundle lean)
- **Mock data**: `src/data/mockMovies.ts` — use this until WP API is wired

## File structure
```
src/
  components/
    MovieCard/       # Poster card with hover video preview
    HeroSection/     # Big featured title banner
    GenreRow/        # Horizontal scrollable row
    NavBar/          # Sticky top nav
    DetailModal/     # Full movie detail overlay (Framer Motion layoutId)
  pages/
    Browse.tsx       # / — main grid
    MovieDetail.tsx  # /movie/:slug
    Search.tsx       # /search?q=
  hooks/
    useMovies.ts     # TanStack Query wrapper for WP API
    useHoverVideo.ts # 5-sec clip autoplay logic
  data/
    mockMovies.ts    # TypeScript mock data (source of truth during dev)
  api/
    wordpress.ts     # All WP REST API calls (swap mock ↔ live here)
  store/
    modalStore.ts    # Zustand store for DetailModal state
  styles/
    theme.css        # CSS custom properties — colors, fonts, spacing
```

## Theme tokens (theme.css)
```css
:root {
  --bg-primary: #0a0a0f;
  --bg-card: #141420;
  --bg-hover: #1e1e2e;
  --accent: #e50914;
  --accent-glow: #e5091430;
  --text-primary: #ffffff;
  --text-muted: #9999aa;
  --radius-card: 8px;
  --transition-card: 300ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

## Key interactions (all implemented)
1. **MovieCard hover**: scale 1 → 1.08 (inner wrapper), reveal overlay, autoplay muted 5-sec clip after 800ms
2. **GenreRow scroll**: horizontal overflow-x, hidden scrollbar, arrow buttons fade in on row hover
3. **DetailModal**: card morphs into modal via Framer Motion `layoutId`, content fades in after spring settles
4. **HeroSection**: backdrop image, gradient overlay, Framer Motion entrance animation
5. **Route transitions**: `AnimatePresence` wrapping `<Routes>` for page fades

## Movie TypeScript interface
```typescript
export interface Movie {
  id: number;
  title: string;
  slug: string;
  genre: string[];
  year: number;
  rating: number;
  duration: string;
  synopsis: string;
  posterUrl: string;
  backdropUrl: string;
  previewClipUrl: string;
  trailerUrl: string;
  cast: { name: string; role: string }[];
  isFeatured?: boolean;
}
```

## WordPress API integration
Base URL: `https://cms.enriquesolis.me/wp-json/wp/v2`
Key endpoint: `GET /movies?_embed&acf_format=standard&per_page=100`
Toggle: `VITE_USE_MOCK=true` in `.env.local` during development (default: true).

## WordPress ACF field group (Movie CPT)
| Field name     | ACF type  | Notes                        |
|----------------|-----------|------------------------------|
| genre          | Select    | Action, Drama, Sci-Fi, etc.  |
| year           | Number    | 4-digit year                 |
| rating         | Number    | 0–10                         |
| duration       | Text      | "2h 14m"                     |
| synopsis       | Textarea  | Short description             |
| poster_image   | Image     | Returns URL                  |
| backdrop_image | Image     | Wide hero image               |
| preview_clip   | File      | .mp4, max ~15MB              |
| trailer_url    | URL       | YouTube embed URL            |
| cast           | Repeater  | name + role sub-fields       |

Enable via: field group settings → Show in REST API → Yes.

## Recruiter demo notes
- The `/` route should immediately wow — hero video, smooth card animations
- Footer badge: "Powered by WordPress REST API"
- Deploy frontend to Vercel at `frameshift.enriquesolis.me`
- Add a GitHub Actions badge to the README

---

## Working with Claude Code — workflow preferences

### When asked to build a component
1. Show the TypeScript interface/types first
2. Write the component with CSS Module import
3. Show the CSS module file
4. Show example usage in a parent component

### When asked to "wire up" an API
- Keep the mock data path working — wrap with the `VITE_USE_MOCK` feature flag
- Show the React Query hook separately from the component
- Add error and loading states

### Animation pattern
Use Framer Motion `motion.*` components. Variants pattern preferred:
```typescript
const cardVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.08, transition: { duration: 0.3 } },
};
```

### layoutId pattern (DetailModal)
- `layoutId` goes on the outermost wrapper only — no transforms on the same element
- Scale/hover variants go on an inner wrapper so they don't conflict with the layout exit animation
- Backdrop is a separate `motion.div` with plain opacity fade — never share layoutId with the panel

### Code style
- TypeScript strict mode — no `any`
- Named exports only (no default exports except pages)
- CSS Modules for all styling — no inline styles except dynamic values
- Comments only on non-obvious logic

### When asked to "debug this"
Read the browser console error first, then check component types, then check the API response shape.
