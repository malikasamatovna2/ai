# Monorepo layout

This repository is set up as an npm workspace with two packages:

- `/frontend` — Vite + React + TypeScript frontend
- `/backend` — Express + TypeScript backend (mock endpoints)

Quick commands (from repository root):
- Install dependencies for all packages: `npm install`
- Run frontend dev: `npm run dev:frontend`
- Run backend dev: `npm run dev:backend`
- Run both (developer choice): run both terminals or use `npm run dev` (starts frontend)

Notes:
- Frontend imports design tokens from `docs/ui/design_tokens.css`.
- Backend endpoints (mock):
  - POST `/recommend/style` — returns sample styles
  - POST `/bookings` — creates mock booking

Next steps: add DB seed scripts, OpenAPI spec, CI, and Replit deployment config.
