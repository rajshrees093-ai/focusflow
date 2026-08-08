# Future Scope — FocusFlow

How this specific project could evolve, grounded in what v1.0.0 actually is today: a single-user, JSON-file-backed, rule-based (Claude-swappable) task planner.

---

## Next 3 Months

- **Wire in the real Claude API.** The single highest-leverage change: swap `server/lib/mockParser.js` and the plan-generation logic in `generatePlan.js` for actual Claude API calls, using the exact same request/response contracts already in place. No other files need to change — this was designed on Day 5 specifically to make this swap trivial.
- **Migrate storage to a real database.** JSON-file storage was correct for v1.0's single-user scope, but is the first thing to replace once multi-user support is even being considered. SQLite is a natural first step (still no external service required) before something like Postgres.
- **Add basic authentication.** Explicitly excluded from v1.0 by design — the natural next step once the app needs to support more than one person's task list.

## Next 6 Months

- **Multi-user accounts**, built on top of the database migration above.
- **Recurring tasks / habit tracking**, extending the existing Task schema with a `recurrence` field rather than a new entity.
- **Calendar sync (Google Calendar)**, using the AI parsing layer to also extract explicit dates/times, not just relative urgency.
- **Mobile-optimized PWA**, building on Day 7's responsive foundation rather than starting over.

## Next 12 Months

- **Team/collaboration features** — shared task lists, once multi-user accounts exist.
- **Push notifications and reminders**, likely via a service worker once the PWA groundwork is in place.
- **A public API** for FocusFlow itself, letting other tools submit tasks programmatically — a natural extension of the clean REST contract already established in `API.md`.
- **Analytics on planning patterns** — surfacing insights like "you complete High-urgency Work tasks 80% of the time but Low-urgency Personal tasks rarely" — genuinely useful only once there's enough real usage data to be meaningful, which is why this sits at the 12-month mark, not sooner.

## What Won't Change

The core insight from Day 1's PRD — that people are good at describing tasks and bad at structuring them — stays the product's north star through all of the above. Every item on this list adds capability without replacing the core loop: type it messy, get back a clear plan.