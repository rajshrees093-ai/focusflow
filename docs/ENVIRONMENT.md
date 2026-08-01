# ENVIRONMENT.md — FocusFlow Environment & Configuration Reference

This is the single source of truth for every environment variable, tool version, and configuration file in the project.

---

## 1. Server Environment Variables (`server/.env`)

| Variable | Required | Example / Default | Purpose |
|---|---|---|---|
| `ANTHROPIC_API_KEY` | Yes | `sk-ant-...` | Authenticates server-side calls to the Claude API. Never exposed to the client. |
| `PORT` | No | `3001` | Port the Express server listens on locally. Render sets this automatically in production. |
| `CORS_ORIGIN` | Yes | `http://localhost:5173` (local) / deployed frontend URL (production) | Restricts which frontend origin is allowed to call the API. |

**Template file:** `server/.env.example` (committed to git, contains no real values).
**Real file:** `server/.env` (gitignored — never committed).

---

## 2. Client Environment Variables (`client/.env.production`)

| Variable | Required | Example | Purpose |
|---|---|---|---|
| `VITE_API_BASE_URL` | Production only | `https://focusflow-api.onrender.com` | Points the deployed frontend at the deployed backend. In local dev, the API client defaults to `http://localhost:3001` if this is unset. |

Vite requires the `VITE_` prefix for any env variable to be exposed to client-side code — this is a Vite security convention, not a FocusFlow-specific choice.

---

## 3. Tooling Versions Used

| Tool | Version installed |
|---|---|
| Node.js | LTS (v20.x) |
| npm | Bundled with Node LTS |
| React | Latest (via `npm create vite@latest`) |
| Vite | Latest |
| Express | Latest 4.x |
| `@anthropic-ai/sdk` | Latest |
| `cors` | Latest |
| `dotenv` | Latest |

*(Exact installed versions are pinned in `client/package.json` and `server/package.json` after `npm install` — check those files for the precise numbers in your local clone.)*

---

## 4. Configuration Files

| File | Purpose |
|---|---|
| `server/.env` | Real secrets (gitignored) |
| `server/.env.example` | Template committed to git so any new clone knows what variables to set |
| `client/.env.production` | Production API URL (committed — contains no secrets, just a public URL) |
| `.gitignore` (root) | Excludes `.env`, `node_modules/`, and build output from both `client/` and `server/` |
| `client/vite.config.js` | Vite's build/dev-server config — default settings, no customization needed for v1.0 |

---

## 5. Where Secrets Live in Production (Day 9 preview)

- **Render (backend):** `ANTHROPIC_API_KEY`, `CORS_ORIGIN` set directly in the Render dashboard's Environment tab — never committed to git.
- **Vercel (frontend):** `VITE_API_BASE_URL` set in Vercel's Environment Variables settings, or committed via `.env.production` since it's a public URL, not a secret.

This section will be filled in with real deployed URLs on Day 9 once hosting is live.