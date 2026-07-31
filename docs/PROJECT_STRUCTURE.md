# PROJECT-STRUCTURE.md — FocusFlow Folder Structure

**Repo:** `github.com/rajshrees093-ai/focusflow`
**Established:** Day 2 (repo skeleton created Day 2; this document defines what goes where as Days 3–10 build out)

---

## 1. Top-Level Structure

```
focusflow/
├── client/              → React + Vite frontend (Days 5-7)
├── server/              → Node.js + Express backend (Days 3-4, 6-8)
├── docs/                → All planning & design documentation (Days 1-2 deliverables live here)
├── .gitignore
└── README.md
```

---

## 2. `client/` — Frontend

```
client/
├── src/
│   ├── components/
│   │   ├── TaskInput.jsx           → Day 5: free-text input screen
│   │   ├── ParsedTaskReview.jsx     → Day 5: AI-parsed task review/edit screen
│   │   ├── TodaysPlan.jsx           → Day 6: main dashboard, AI-generated plan
│   │   ├── AllTasks.jsx             → Day 7: full task list view
│   │   ├── NavTabs.jsx              → Day 6: top-level navigation
│   │   ├── StreakBadge.jsx          → Day 7: streak display
│   │   └── ErrorBoundary.jsx        → Day 8: crash containment
│   ├── api/
│   │   └── client.js                → fetch wrapper for all backend calls
│   ├── App.jsx                       → root component, view/tab state
│   ├── App.css / index.css           → Day 7 design system (colors, spacing, type)
│   └── main.jsx                      → Vite entry point
├── index.html
├── vite.config.js
├── package.json
└── .env.production                   → VITE_API_BASE_URL (not committed with real values)
```

**Responsible for:** everything the user sees and interacts with. No business logic beyond UI state — all AI calls and data persistence are delegated to the backend API.

---

## 3. `server/` — Backend

```
server/
├── routes/
│   ├── tasks.js              → Day 3: GET/POST/PATCH/DELETE /api/tasks
│   ├── parseTasks.js          → Day 4: POST /api/parse-tasks
│   ├── generatePlan.js        → Day 6: POST /api/generate-plan
│   └── streak.js              → Day 7: GET /api/streak
├── store/
│   ├── taskStore.js           → Day 3: read/write logic for tasks.json
│   ├── tasks.json             → Day 3: persisted task data (gitignored in production data, committed as empty array for dev)
│   └── streak.json            → Day 7: persisted streak metadata
├── lib/
│   ├── claudeClient.js        → Day 4: shared Anthropic SDK instance
│   └── prompts.js              → Day 4 & 6: parsing + planning prompt templates
├── index.js                    → Express app entry point, route registration, CORS config
├── package.json
├── .env                         → ANTHROPIC_API_KEY, PORT, CORS_ORIGIN (gitignored)
└── .env.example                 → committed template showing required variable names
```

**Responsible for:** all business logic, all Claude API calls, all data persistence, and keeping the API key server-side only. This is the only layer allowed to talk to the Claude API, per ARCHITECTURE.md.

---

## 4. `docs/` — Documentation

```
docs/
├── PRD.md                        → Day 1
├── Implementation_Blueprint.md    → Day 1 (updated Day 2 if needed)
├── Pitch_Deck.pptx                → Day 1
├── ARCHITECTURE.md                → Day 2
├── SCHEMA.md                      → Day 2
├── API.md                         → Day 2
├── UI-WIREFRAMES.md               → Day 2
├── PROJECT-STRUCTURE.md           → Day 2 (this file)
└── retrospective.md               → Day 10
```

**Responsible for:** the complete paper trail of decisions, so any future session (or another developer) can understand *why* the code looks the way it does without re-deriving it from scratch. This directly supports the capstone requirement that each day's AI session can pick up context immediately.

---

## 5. Why This Structure Was Chosen

- **Clear frontend/backend separation** (`client/` vs `server/`) mirrors the architecture in ARCHITECTURE.md and makes independent deployment (Vercel + Render) straightforward on Day 9 — each folder deploys as its own project with no shared build step.
- **`routes/`, `store/`, `lib/` split on the backend** keeps HTTP handling, data persistence, and AI/prompt logic independently testable — matches the Blueprint's day-by-day build order (CRUD on Day 3, AI parsing on Day 4, planning on Day 6) without any single file growing unmanageably large.
- **`components/` flat structure on the frontend** is intentionally simple — with only 7 components total in v1.0, nested feature folders would be over-engineering for this scope.
- **`docs/` centralizes all planning artifacts** in the actual codebase (not just the separate AB Talks challenge repo), so the project is self-documenting for anyone who clones it.
- **No `tests/` folder yet** — Day 8 is a dedicated testing day; test files will live alongside the components/routes they test (e.g., co-located `*.test.js` files) rather than in a separate mirrored tree, keeping things simple for a solo 10-day build.

This structure requires no changes to proceed with Day 3 implementation — it's ready to build into immediately.