<<<<<<< HEAD
# Ember-Ground-premium-steakhouse-and-cafe
A premium steakhouse and café Landing page
=======
﻿# Ember & Ground

A premium steakhouse and café landing page built with **Next.js App Router**, **TypeScript**, **Tailwind CSS**, and a **SQLite** reservation backend.

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Framework | Next.js 15 (App Router) | Server components, image optimisation, API routes |
| Language | TypeScript (strict) | Type safety across content, components, and API |
| Styling | Tailwind CSS (fully customised theme) | Custom colour palette, typography scale, border radius |
| Fonts | Cormorant Garamond + DM Sans | Editorial serif + restrained sans — intentional pairing |
| Forms | React Hook Form + Zod | Client and server validation from a shared schema |
| Database | SQLite via better-sqlite3 | Zero external services — runs fully locally |
| Images | next/image | WebP/AVIF, lazy loading, correct aspect ratios |

---

## Architecture

```
ember-and-ground/
├── app/
│   ├── layout.tsx          # Root layout — fonts, metadata, Navbar, Footer
│   ├── page.tsx            # Home page — server component, composes all sections
│   ├── globals.css         # Tailwind imports + global reset
│   └── api/
│       └── reservations/
│           └── route.ts    # POST handler — validates, inserts to SQLite
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Sticky nav, scroll state, mobile drawer
│   │   └── Footer.tsx      # Brand info, contact, social
│   ├── sections/
│   │   ├── Hero.tsx        # Full-bleed, editorial type composition
│   │   ├── About.tsx       # Asymmetric image + text layout
│   │   ├── Steakhouse.tsx  # MenuCard list, dark tone
│   │   ├── Cafe.tsx        # MenuCard grid, café tone
│   │   ├── Gallery.tsx     # Filterable photo grid
│   │   ├── Location.tsx    # Map embed + address
│   │   ├── Hours.tsx       # Hours by day, split by service
│   │   └── ReservationForm.tsx  # Client form → POST /api/reservations
│   └── ui/
│       ├── Section.tsx     # Base wrapper (tone, maxWidth, padding)
│       ├── MenuCard.tsx    # Item card — text-dominant, price-right
│       └── GalleryGrid.tsx # Filterable masonry grid
├── content/                # Structured JSON — the mock CMS layer
│   ├── menu.json
│   ├── gallery.json
│   ├── hours.json
│   └── about.json
├── lib/
│   ├── content.ts          # Typed loaders (the CMS adapter seam)
│   ├── db.ts               # SQLite singleton + insertReservation
│   ├── reservationSchema.ts # Zod schema shared by client + server
│   └── utils.ts            # cn() helper
└── public/images/          # Optimised images served by next/image
```

### How Frontend and Backend Connect

1. User fills out `ReservationForm` (client component)
2. `react-hook-form` + `zod` validates locally before submission
3. On submit, a `fetch POST` goes to `/api/reservations`
4. The API route re-validates with the same Zod schema server-side
5. Honeypot field and rate limit (5 req/min/IP) are checked
6. Validated data is inserted into `reservations.db` via `better-sqlite3`
7. A `{ success: true, id }` or error response is returned
8. The form transitions to a success or error state

### Content Layer

All content lives in `/content/*.json`. The `lib/content.ts` module exports typed loader functions (`getMenuItems()`, `getGalleryItems()`, etc.). These currently read from JSON files directly.

To plug in a real CMS (Sanity, Contentful, etc.), replace the implementation inside `lib/content.ts` only — the component interfaces don't change.

---

## Local Setup

### Prerequisites
- Node.js 20+
- npm 9+

### Install

```bash
git clone <repo>
cd ember-and-ground
npm install
```

### Environment Variables

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

No variables are required to run locally. The SQLite database is created automatically at `./reservations.db` on first form submission.

| Variable | Default | Description |
|---|---|---|
| `DB_PATH` | `./reservations.db` | Path to SQLite database file |
| `RESEND_API_KEY` | — | Optional: Resend API key for email notifications |
| `NOTIFY_EMAIL` | — | Optional: Email to notify on new reservations |

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Verify the Reservation Backend

1. Fill in the reservation form and submit
2. Check that `reservations.db` was created in the project root
3. Inspect it:
   ```bash
   # Using SQLite CLI
   sqlite3 reservations.db "SELECT * FROM reservations;"
   ```

---

## Design Decisions

- **No glassmorphism, no pill buttons**: Border-radius capped at 10px. Sharp, deliberate.
- **Two typography identities**: Cormorant Garamond for headings (confident, weight-bearing), DM Sans for body (restrained, readable).
- **Section layouts vary**: Each section has its own grid logic — intentional asymmetry, not copy-pasted card grids.
- **Colour palette split**: Charcoal/oxblood/brass for the steakhouse; cream/terracotta/sage for the café. Tied together by the same warm underlying tone.
- **Server components by default**: Only `GalleryGrid` (filter state) and `ReservationForm` (form state) are `"use client"`. Everything else is a server component.
>>>>>>> 4644681 (Initial commit)
