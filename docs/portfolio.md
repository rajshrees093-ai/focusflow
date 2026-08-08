# FocusFlow — Portfolio Materials

## Project Description (short — for a portfolio card/list)

FocusFlow is an AI-powered task planner that turns messy, natural-language to-do lists into a prioritized daily plan. Built end-to-end in a structured 10-day sprint — from PRD to deployed v1.0.0 — using React, Node/Express, and a Claude-API-ready parsing architecture.

## Project Description (long — for a portfolio page)

FocusFlow solves a specific, common problem: task apps make you do the organizing yourself, and that structuring overhead is exactly the kind of work people avoid — so tasks pile up unsorted. FocusFlow flips that: type your tasks the way you'd actually think them, and the app parses, categorizes, prioritizes, and returns a clear daily plan with reasoning.

The project was built solo over a structured 10-day sprint following a full SDLC — requirements, system design, implementation, refinement, and production launch — with every architectural decision documented before code was written. A key engineering decision came on Day 5: rather than requiring a paid API key for local development, the parsing and planning logic was built as a free, rule-based system matching the exact output contract the real Claude API will use — meaning the "real AI" swap-in later requires changing exactly one file, nothing else. The app shipped with full accessibility support (keyboard navigation, screen-reader labels, focus management), a production-hardened backend (error boundaries, graceful failure handling), and is deployed live on free-tier infrastructure (Vercel + Render).

**Live demo:** [add your URL]
**Repo:** [add your URL]

## Resume Bullet Points

- Designed and shipped FocusFlow, a full-stack AI task-planning web app, solo, across a structured 10-day sprint following a complete SDLC from requirements through production launch.
- Architected a swappable AI-integration pattern that let core parsing/planning features ship on free infrastructure while preserving a zero-friction upgrade path to a live LLM API.
- Built a REST API (Node/Express) and React frontend implementing full CRUD, AI-assisted task parsing, and priority-based daily plan generation.
- Conducted a dedicated UX/accessibility refinement pass (WCAG-aligned focus states, ARIA roles, responsive design) and a production-readiness review (error handling, SEO, security) before public launch.
- Deployed and maintained a live production application on Vercel and Render, documenting the full technical build (architecture, schema, API, and setup docs) for reproducibility.

## Interview Talking Points

**"Tell me about a technical trade-off you made."**
On Day 5, the project's core AI-parsing feature directly conflicted with a "free tools only" constraint. Instead of picking one side silently, I surfaced the conflict, then designed a rule-based parser matching Claude's exact future output contract — so the real API integration later is a single-file change, not a rewrite. That's the kind of decision that matters more in real engineering than picking the "purest" technical solution.

**"How do you approach scoping a project?"**
Day 1 wasn't about picking the most ambitious idea — it was explicitly scoping for "most impressive thing completable in the time available," and writing down what was excluded (auth, multi-user, calendar sync) as carefully as what was included. That discipline meant zero scope creep across the following nine days.

**"Walk me through your architecture."**
Single-user by design, so JSON-file storage instead of a database — deliberately avoiding infrastructure the product didn't need yet. Express backend proxies all AI calls so no API key is ever exposed client-side. Full request/response contracts were documented (`API.md`) before implementation, which meant zero API surface changes across the entire build.

**"How do you handle production readiness?"**
Day 9 was a dedicated Release Readiness Review: error boundaries so failures degrade gracefully, backend error middleware so no raw stack traces leak, SEO/social metadata, and a security pass confirming no secrets were ever committed.

## Demo Script (2–3 minutes)

1. **Open the live app.** "This is FocusFlow — it turns a messy to-do list into a clear plan."
2. **Type a real example** into the input box: *"finish report by Friday, call mom sometime, gym at 6am tomorrow, buy groceries."*
3. **Show the parsed review screen.** "It's broken this into four tasks, each with a category, urgency, and time estimate — and I can edit any of it before saving."
4. **Confirm and land on Today's Plan.** "Now it's prioritized — the report's first because it's high-urgency, with a one-line reason for each ordering decision."
5. **Mark a task complete.** "And there's a streak counter tracking daily follow-through."
6. **Mention the architecture, briefly.** "Under the hood, this uses a swappable parsing layer — free rule-based logic right now, designed to drop in the real Claude API with a one-file change."
7. **Close on the build story.** "This was built in a structured 10-day sprint — full requirements and system design before any code, then implementation, UX refinement, and a production launch review."

## Suggested Screenshots / Demo Media

- The Task Input screen with a realistic messy example typed in
- The Parsed Task Review screen showing editable categorized tasks
- Today's Plan with the streak badge visible
- All Tasks view showing a mix of complete/incomplete tasks
- Mobile viewport screenshot (proves the responsiveness work from Day 7)

## Suggested GitHub Topics

`react` `nodejs` `express` `ai` `claude-api` `task-management` `productivity` `full-stack` `vite` `rest-api`

## Suggested Repository Metadata

- **Description:** "AI-powered task prioritization and daily planning — type messy tasks, get a clear plan. Built in a 10-day sprint."
- **Website:** your live Vercel URL
- **Topics:** as listed above