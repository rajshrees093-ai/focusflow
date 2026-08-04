# PROJECT-STRUCTURE.md — FocusFlow Folder Structure (Updated Day 6)

**Status: MVP complete and deployed.**

## `client/src/`
```
components/
  NavTabs.jsx              ✅ Day 3
  TaskInput.jsx             ✅ Day 5
  ParsedTaskReview.jsx      ✅ Day 5
  TodaysPlan.jsx            ✅ Built Day 6
  AllTasks.jsx              ✅ Built Day 6
  StreakBadge.jsx           ✅ Built Day 6
  ErrorBoundary.jsx         🔜 Day 8
api/client.js                ✅ Updated Day 6 — added updateTask, deleteTask, generatePlan, getStreak
App.jsx                       ✅ Updated Day 6 — full MVP wiring + required footer
App.css                       ✅ Updated Day 6 — plan/task/streak/footer styling
```

## `server/`
```
routes/
  tasks.js               ✅ Updated Day 6 — streak trigger on completion
  parseTasks.js            ✅ Day 5
  generatePlan.js           ✅ Built Day 6
  streak.js                 ✅ Built Day 6
store/
  taskStore.js              ✅ Day 3
  tasks.json                 ✅ Live data
  streakStore.js             ✅ Built Day 6
  streak.json                 ✅ Built Day 6
lib/
  claudeClient.js             ✅ Day 3, still unused
  mockParser.js                ✅ Day 5
index.js                        ✅ Updated Day 6 — all 4 routers registered
.env.production (client)         ✅ Built Day 6 — VITE_API_BASE_URL set to Render URL
```

## `docs/`
All prior docs unchanged and current. Added: `DAY6-SUMMARY.md`.

## Deployment (new today)
- **Backend:** Render (free tier) — `https://[your-render-url].onrender.com`
- **Frontend:** Vercel (free tier) — `https://[your-vercel-url].vercel.app`

## What Changed From Day 5
New: `generatePlan.js`, `streakStore.js`, `streak.json`, `streak.js`, `TodaysPlan.jsx`, `AllTasks.jsx`, `StreakBadge.jsx`. Updated: `tasks.js`, `index.js`, `App.jsx`, `App.css`, `client.js`. The application is now a complete, deployed MVP — no structural surprises, everything landed where Day 2's architecture said it would.