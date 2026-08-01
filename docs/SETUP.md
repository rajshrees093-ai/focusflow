# SETUP.md — FocusFlow Development Environment

**Purpose:** everything needed to get FocusFlow running locally from a clean machine. Follow this top to bottom on a fresh clone.

---

## 1. Prerequisites

| Tool | Version | Why it's needed | Check with |
|---|---|---|---|
| Node.js | LTS, v20+ | Runtime for both the Vite/React frontend and the Express backend | `node -v` |
| npm | Bundled with Node | Installs and manages all project dependencies | `npm -v` |
| Git | Any recent version | Version control, already used since Day 2 | `git --version` |
| VS Code | Latest | Editor used throughout the capstone | — |
| VS Code extensions | ESLint, Prettier | Catches bugs and formatting issues while typing | Install from Extensions panel |
| Anthropic API key | — | Required for the server to call Claude (Days 4 & 6 features) | From the Anthropic Console |

---

## 2. Clone & Install

```powershell
git clone https://github.com/rajshrees093-ai/focusflow.git
cd focusflow
```

### Frontend
```powershell
cd client
npm install
```

### Backend
```powershell
cd ..\server
npm install
```

---

## 3. Environment Variables

Copy the template and fill in your real key:
```powershell
cd server
copy .env.example .env
```
Then open `.env` and set `ANTHROPIC_API_KEY` to your real key. Full variable reference is in `ENVIRONMENT.md`.

---

## 4. Running the Project Locally

**Terminal 1 — backend:**
```powershell
cd server
node index.js
```
You should see: `FocusFlow server listening on port 3001`

**Terminal 2 — frontend:**
```powershell
cd client
npm run dev
```
Vite will print a local URL (typically `http://localhost:5173`). Open it in your browser.

---

## 5. Verifying It Works

- The browser should show the FocusFlow header, the two nav tabs ("Today's Plan" / "All Tasks"), and placeholder text for each view.
- Below that, you should see: **Backend status: FocusFlow server is running** — this confirms the frontend successfully reached the backend's `/api/health` route.
- If it instead says "Could not reach server," see the Troubleshooting section below.

---

## 6. Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| "Could not reach server" in the browser | Backend isn't running, or wrong port | Confirm Terminal 1 shows the server listening; confirm `VITE_API_BASE_URL` (if set) matches |
| CORS error in browser console | `CORS_ORIGIN` in `server/.env` doesn't match the Vite dev URL | Set `CORS_ORIGIN=http://localhost:5173` in `server/.env`, restart the server |
| `Cannot find module 'express'` (or similar) | Dependencies not installed in that folder | Re-run `npm install` inside `server/` (or `client/`) |
| Port 3001 already in use | Another process is using it | Change `PORT` in `server/.env`, restart |

---

## 7. Daily Workflow (Days 4–10)

Every day of the remaining build:
1. Pull latest: `git pull origin main`
2. Start both servers as in Section 4
3. Build the day's features per the Implementation Blueprint
4. Commit and push at end of day