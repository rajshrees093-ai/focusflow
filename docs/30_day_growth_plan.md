# 30-Day Growth Plan — FocusFlow

A realistic, day-by-day roadmap taking v1.0.0 from "solid single-user MVP" to a significantly more complete product. Each day builds on the previous one — no day assumes work that hasn't happened yet.

**Stack assumption throughout:** React + Vite, Node/Express, moving from JSON-file storage to SQLite mid-month, real Claude API once wired in.

| Day | Milestone |
|---|---|
| 1 | Get a real Anthropic API key; wire `mockParser.js` into an actual Claude call behind the same contract. Verify parsing quality improves. |
| 2 | Wire real Claude calls into `generatePlan.js` the same way. Compare plan quality against the rule-based version. |
| 3 | Add a `prompts.js` module with versioned, documented prompt templates for both features. |
| 4 | Add automated tests (Jest) for the CRUD API — the first regression safety net. |
| 5 | Add automated tests for the parsing/planning endpoints, mocking the Claude API responses. |
| 6 | Install SQLite (`better-sqlite3`); design the equivalent schema to `SCHEMA.md`. |
| 7 | Write a migration script: read `tasks.json`, insert into SQLite, verify row counts match. |
| 8 | Swap `taskStore.js` internals to use SQLite instead of file I/O. Keep the same function signatures — routes shouldn't need to change. |
| 9 | Full regression pass: every existing feature retested against the new storage layer. |
| 10 | Add a `users` table (id, email, password hash) — schema only, no auth logic yet. |
| 11 | Add signup/login endpoints using `bcrypt` + JWT, following the same validation patterns as the existing API. |
| 12 | Add auth middleware; scope all task queries to the logged-in user's ID. |
| 13 | Build login/signup screens on the frontend, matching the Day 7 design system. |
| 14 | Full regression pass with real multi-account testing. |
| 15 | **Midpoint checkpoint:** confirm the app now supports real accounts with real Claude parsing — write a short internal note on what changed and why. |
| 16 | Add a `recurrence` field to the Task schema (daily/weekly/none). |
| 17 | Add recurrence logic: on completion of a recurring task, auto-create the next occurrence. |
| 18 | Add recurrence UI to the task input/review flow. |
| 19 | Add a lightweight service worker for offline page-load caching (not full offline sync — that's out of scope for this window). |
| 20 | Add push notification permission request + a daily "here's your plan" reminder notification. |
| 21 | Add a settings screen: notification preferences, timezone. |
| 22 | Full regression + mobile testing pass on the new features. |
| 23 | Begin Google Calendar integration: OAuth flow setup. |
| 24 | Pull calendar events into the planning context — Claude's plan generation now considers existing meetings. |
| 25 | Display calendar events alongside tasks in the Today's Plan view. |
| 26 | Add basic usage analytics (completion rates by category/urgency) — server-side aggregation only, no new UI yet. |
| 27 | Build a simple analytics view on the frontend surfacing those insights. |
| 28 | Full end-to-end regression pass across every feature built this month. |
| 29 | Production readiness pass on all new features: error handling, loading states, accessibility — same bar as Day 9 of the original capstone. |
| 30 | Deploy v2.0.0, write release notes, tag the release, and write a retrospective on the 30-day sprint the same way Day 10 of the original capstone did. |

## Ground Rules Throughout

- No day starts a feature that isn't finished and tested by the end of that day, or clearly scoped to continue the next day.
- Every storage/auth change gets a full regression pass before moving on — the same discipline that kept the original 10-day build stable.
- If a day's milestone turns out to be too big, simplify it rather than letting it bleed into the next day — the same principle applied throughout the original capstone.