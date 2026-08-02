# PROJECT-STRUCTURE.md — FocusFlow Folder Structure (Updated Day 4)

**Status:** Task CRUD API complete. This updates the Day 3 version.

---

## 1. Top-Level Structure (unchanged)

```
focusflow/
├── client/              → React + Vite frontend
├── server/               → Node.js + Express backend
├── docs/                 → All planning & design documentation
├── .gitignore
└── README.md
```

## 2. `client/` — unchanged since Day 3

No frontend files were touched today — Day 4 was backend-only, per the Implementation Blueprint. See Day 3's `PROJECT-STRUCTURE.md` for the full frontend breakdown; it remains accurate.

## 3. `server/` — Updated

```
server/
├── routes/
│   ├── tasks.js               ✅ Built Day 4 — full CRUD: GET/POST/PATCH/DELETE
│   ├── parseTasks.js           🔜 Day 5
│   ├── generatePlan.js         🔜 Day 6
│   └── streak.js               🔜 Day 7
├── store/
│   ├── taskStore.js            ✅ Built Day 3, used (unchanged) by tasks.js today
│   ├── tasks.json               ✅ Now holds real task data from testing
│   └── streak.json              🔜 Day 7
├── lib/
│   ├── claudeClient.js          ✅ Built Day 3, not yet called (still unused until Day 5)
│   └── prompts.js                🔜 Day 5
├── index.js                      ✅ Updated Day 4 — registers /api/tasks router
├── package.json                  ✅ Day 3
├── .env                           ✅ Day 3 (gitignored)
└── .env.example                   ✅ Day 3
```

## 4. `docs/` — Updated

```
docs/
├── PRD.md                        ✅ Day 1
├── Implementation_Blueprint.md    ✅ Day 1 (unchanged — no scope drift)
├── Pitch_Deck.pptx                ✅ Day 1
├── ARCHITECTURE.md                ✅ Day 2
├── SCHEMA.md                      ✅ Day 2 (validation implemented exactly as designed)
├── API.md                         ✅ Day 2 (implementation matches exactly, no changes)
├── UI-WIREFRAMES.md               ✅ Day 2
├── PROJECT-STRUCTURE.md           ✅ Day 2, updated Day 3, updated Day 4 (this file)
├── SETUP.md                       ✅ Day 3
├── ENVIRONMENT.md                 ✅ Day 3
├── DAY3-SUMMARY.md                ✅ Day 3
├── DAY4-SUMMARY.md                ✅ Day 4
└── retrospective.md               🔜 Day 10
```

## 5. What Changed From Day 3

Only `server/routes/tasks.js` (new) and `server/index.js` (updated to register it). No structural surprises — everything built exactly where Day 2's architecture said it would go.