# PROJECT-STRUCTURE.md — FocusFlow Folder Structure (Updated Day 3)

**Status:** foundation built. This updates the Day 2 version with what actually exists on disk after today, versus what's still planned for Days 4–10.

---

## 1. Top-Level Structure (unchanged from Day 2)

```
focusflow/
├── client/              → React + Vite frontend
├── server/               → Node.js + Express backend
├── docs/                 → All planning & design documentation
├── .gitignore
└── README.md
```

No changes to the top-level layout — Day 2's structure held up exactly as designed.

---

## 2. `client/` — Built Today vs. Planned

```
client/
├── src/
│   ├── components/
│   │   ├── NavTabs.jsx              ✅ Built Day 3 — tab navigation, no router needed
│   │   ├── TaskInput.jsx             🔜 Day 5
│   │   ├── ParsedTaskReview.jsx      🔜 Day 5
│   │   ├── TodaysPlan.jsx            🔜 Day 6
│   │   ├── AllTasks.jsx              🔜 Day 7
│   │   ├── StreakBadge.jsx           🔜 Day 7
│   │   └── ErrorBoundary.jsx         🔜 Day 8
│   ├── api/
│   │   └── client.js                 ✅ Built Day 3 — fetch wrapper + health check
│   ├── App.jsx                        ✅ Built Day 3 — root component, tab state, renders placeholders
│   ├── App.css                        ✅ Built Day 3 — base design tokens (full pass Day 7)
│   └── main.jsx                       ✅ Vite default entry point
├── index.html                          ✅ Vite default
├── vite.config.js                      ✅ Vite default
├── package.json                        ✅ Built Day 3
└── .env.production                     🔜 Day 9 (deployment)
```

---

## 3. `server/` — Built Today vs. Planned

```
server/
├── routes/
│   ├── tasks.js               🔜 Day 3 (implementation) — CRUD endpoints
│   ├── parseTasks.js           🔜 Day 4
│   ├── generatePlan.js         🔜 Day 6
│   └── streak.js               🔜 Day 7
├── store/
│   ├── taskStore.js            ✅ Built Day 3 — read/write functions, CRUD logic added tomorrow
│   ├── tasks.json              ✅ Built Day 3 — initialized as empty array
│   └── streak.json             🔜 Day 7
├── lib/
│   ├── claudeClient.js         ✅ Built Day 3 — shared Anthropic SDK instance, not yet called by any route
│   └── prompts.js               🔜 Day 4
├── index.js                     ✅ Built Day 3 — Express app, CORS, /api/health route
├── package.json                 ✅ Built Day 3
├── .env                         ✅ Created locally (gitignored)
└── .env.example                 ✅ Built Day 3 — committed template
```

---

## 4. `docs/` — Unchanged

```
docs/
├── PRD.md                        ✅ Day 1
├── Implementation_Blueprint.md    ✅ Day 1
├── Pitch_Deck.pptx                ✅ Day 1
├── ARCHITECTURE.md                ✅ Day 2
├── SCHEMA.md                      ✅ Day 2
├── API.md                         ✅ Day 2
├── UI-WIREFRAMES.md               ✅ Day 2
├── PROJECT-STRUCTURE.md           ✅ Day 2, updated Day 3 (this file)
├── SETUP.md                       ✅ Day 3
├── ENVIRONMENT.md                 ✅ Day 3
├── DAY3-SUMMARY.md                ✅ Day 3
└── retrospective.md               🔜 Day 10
```

---

## 5. What Changed From the Day 2 Version

Nothing structural. Every folder and file placement matches what was designed on Day 2 exactly — today confirmed the design was buildable as planned, with zero deviations. The only additions are the files themselves now existing with real (if minimal) content instead of being planned paths.

**No update to the Implementation Blueprint was required** — Days 4–10 remain valid as written.