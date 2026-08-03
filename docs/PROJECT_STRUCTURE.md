# PROJECT-STRUCTURE.md — FocusFlow Folder Structure (Updated Day 5)

**Status:** AI parsing (rule-based interim) + Task Input/Review UI complete.

---

## 1. Top-Level Structure (unchanged)

```
focusflow/
├── client/
├── server/
├── docs/
├── .gitignore
└── README.md
```

## 2. `client/` — Updated

```
client/
├── src/
│   ├── components/
│   │   ├── NavTabs.jsx              ✅ Day 3
│   │   ├── TaskInput.jsx             ✅ Built Day 5 — free-text entry
│   │   ├── ParsedTaskReview.jsx      ✅ Built Day 5 — editable review before save
│   │   ├── TodaysPlan.jsx            🔜 Day 6
│   │   ├── AllTasks.jsx              🔜 Day 7
│   │   ├── StreakBadge.jsx           🔜 Day 7
│   │   └── ErrorBoundary.jsx         🔜 Day 8
│   ├── api/
│   │   └── client.js                 ✅ Updated Day 5 — added parseTasks(), createTask(), fetchTasks()
│   ├── App.jsx                        ✅ Updated Day 5 — view-state machine: plan/all/input/review
│   ├── App.css                        ✅ Updated Day 5 — form + review styling
│   └── main.jsx                       ✅ Day 3
├── package.json                        ✅ Day 3
└── .env.production                     🔜 Day 9
```

## 3. `server/` — Updated

```
server/
├── routes/
│   ├── tasks.js               ✅ Day 4
│   ├── parseTasks.js           ✅ Built Day 5 — POST /api/parse-tasks
│   ├── generatePlan.js         🔜 Day 6
│   └── streak.js               🔜 Day 7
├── store/
│   ├── taskStore.js            ✅ Day 3
│   ├── tasks.json               ✅ Holds real saved task data
│   └── streak.json              🔜 Day 7
├── lib/
│   ├── claudeClient.js          ✅ Day 3, still unused — real API not wired in yet
│   ├── mockParser.js            ✅ Built Day 5 — free interim parser, swappable for Claude later
│   └── prompts.js                🔜 When Claude API is wired in
├── index.js                      ✅ Updated Day 5 — registers parseTasks router
├── package.json                  ✅ Day 3
├── .env                           ✅ Day 3
└── .env.example                   ✅ Day 3
```

## 4. `docs/` — Updated

```
docs/
├── PRD.md                        ✅ Day 1
├── Implementation_Blueprint.md    ✅ Day 1
├── Pitch_Deck.pptx                ✅ Day 1
├── ARCHITECTURE.md                ✅ Day 2 (AI section note: currently rule-based, see DAY5-SUMMARY.md)
├── SCHEMA.md                      ✅ Day 2
├── API.md                         ✅ Day 2 — /api/parse-tasks implemented to exact spec
├── UI-WIREFRAMES.md               ✅ Day 2 — Task Input & Review screens now built
├── PROJECT-STRUCTURE.md           ✅ Updated Day 5 (this file)
├── SETUP.md                       ✅ Day 3
├── ENVIRONMENT.md                 ✅ Day 3
├── DAY3-SUMMARY.md                ✅ Day 3
├── DAY4-SUMMARY.md                ✅ Day 4
├── DAY5-SUMMARY.md                ✅ Day 5
└── retrospective.md               🔜 Day 10
```

## 5. What Changed From Day 4

New: `mockParser.js`, `parseTasks.js`, `TaskInput.jsx`, `ParsedTaskReview.jsx`. Updated: `index.js`, `App.jsx`, `App.css`, `client.js`. No structural surprises — everything landed exactly where Day 2's architecture said it would.