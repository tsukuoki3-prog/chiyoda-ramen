# 千代田ラーメンガイド — Chiyoda Ramen Guide

> **BETA** — An inbound-focused ramen discovery guide for Chiyoda Ward, Tokyo.  
> Curated for international visitors: vegan, halal-friendly, and English-menu options included.

## Overview

| Screen | Path | Description |
|--------|------|-------------|
| Restaurant list | `/` | Card grid with tag filtering (Vegan, Halal, Spicy…) |
| Restaurant detail | `/restaurants/[id]` | Photos, dietary icons, ticket-machine guide, menu |
| Feedback | `/feedback` | Beta-tester feedback form |

**11 restaurants** across Akihabara, Kanda, Jimbocho, Kojimachi, Ochanomizu, and Tokyo Station.

## Tech Stack

- **Next.js 16** (App Router, fully static — `generateStaticParams`)
- **Tailwind CSS v4**
- **TypeScript**
- Data managed as **`data/restaurants.json`** — no database required

## Local Development

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Adding a Restaurant

Edit `data/restaurants.json` and follow the existing schema. The `scripts/add-restaurants.mjs` file shows the pattern used to add the current dataset.

## Deployment

This project is configured for **Vercel**. `vercel.json` sets:
- Security headers (HSTS, X-Frame-Options, CSP-adjacent policies)
- Immutable cache for `/_next/static/`
- Clean URLs (no `.html` extensions)

```bash
# One-time setup (requires Vercel CLI)
npm i -g vercel
vercel
```

Or connect the GitHub repository to Vercel via the dashboard for automatic deployments on every push.

## Project Structure

```
app/
  page.tsx                  # Top page (restaurant list)
  restaurants/[id]/page.tsx # Detail page (SSG)
  feedback/page.tsx         # Feedback form
components/
  Header.tsx / Footer.tsx
  RestaurantCard.tsx
  RestaurantList.tsx        # Tag filter + grid (Client Component)
  TagBadge.tsx / TagBadge-colors defined here
data/
  restaurants.json          # Single source of truth for all restaurant data
types/
  index.ts                  # TypeScript interfaces
scripts/
  add-restaurants.mjs       # Helper used to bulk-import restaurant data
```
