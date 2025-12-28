# StylistMatch — Monorepo (Smart Booking System)

Quick start:

1. Install dependencies for all packages

   npm install

2. Run frontend dev

   npm run dev:frontend

3. Run backend dev

   npm run dev:backend

Repository

This project is set up for pushing to GitHub. Push to: https://github.com/malikasamatovna2/ai.git

After pushing, GitHub Actions will run the `CI` workflow which builds the frontend and typechecks the backend.
Notes:
- Frontend: `frontend/` (Vite + React + TypeScript). Open http://localhost:5173 (may start on another port).
- Backend: `backend/` (Express + TypeScript) — runs on port 4000 by default.
- Design tokens are in `docs/ui/design_tokens.css`.

Next steps:
- Add DB seeds, OpenAPI spec, CI, and Replit deployment configuration.
