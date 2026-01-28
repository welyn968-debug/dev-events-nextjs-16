# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
npm run start    # Start production server (requires build first)
```

## Architecture Overview

This is a **Next.js 16** project using the **App Router** with **React 19**, **Tailwind CSS v4**, and **PostHog** analytics integration.

### Key Directories

- `app/` — App Router pages and layouts
- `components/` — Reusable React components
- `lib/` — Utilities (`cn()` for className merging) and data constants
- `actions/` — Server actions for PostHog analytics
- `hooks/` — Custom React hooks
- `providers.tsx` — Root-level PostHog provider wrapper
- `public/` — Static assets (images in `/images/`, icons in `/icons/`)

### PostHog Integration

PostHog is configured at two levels:

1. **Client-side**: `providers.tsx` wraps the app with `PostHogProvider`, initialized via `posthog-js`
2. **Server-side**: `actions/PostHog-action.tsx` uses `posthog-node` for server actions

Environment variables required:
- `NEXT_PUBLIC_POSTHOG_KEY`
- `NEXT_PUBLIC_POSTHOG_HOST`

### Import Aliases

Path alias `@/*` maps to the project root:
```typescript
import { cn } from "@/lib/utils"
import EventCard from "@/components/EventCard"
```

### Styling

- Tailwind CSS v4 with custom CSS variables defined in `app/globals.css`
- Custom utilities: `flex-center`, `text-gradient`, `glass`, `card-shadow`
- Fonts: Schibsted Grotesk (primary) and Martian Mono (monospace)
- Primary color: `#59deca` (teal/cyan)

### LightRays Component

`components/LightRays.tsx` is a WebGL-based visual effect using the OGL library. It renders animated light rays with configurable origin, color, and mouse-follow behavior.
