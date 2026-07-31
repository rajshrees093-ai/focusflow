# API.md — FocusFlow API Design

**Base URL (local):** `http://localhost:3001`
**Base URL (production):** deployed Render URL (set as `VITE_API_BASE_URL` in the client)
**Format:** all requests/responses are JSON. No implementation in this document — design only, per Day 2 scope.
**Authentication:** none in v1.0 (single-user, no accounts — matches PRD exclusions).

---

## 1. `POST /api/parse-tasks`

**Purpose:** Send free-text task input to Claude and receive back structured, unsaved task data for user review (PRD FR-2, FR-3).

**Request**
```json
{ "text": "finish report by Friday, call mom sometime, gym at 6am tomorrow" }
```

**Response — 200 OK**
```json
{
  "tasks": [
    { "title": "Finish report", "category": "Work", "urgency": "High", "estimatedTime": 90 },
    { "title": "Call mom", "category": "Personal", "urgency": "Low", "estimatedTime": 15 },
    { "title": "Gym", "category": "Health", "urgency": "Medium", "estimatedTime": 60 }
  ]
}
```

**Validation**
- `text` is required, must be a non-empty string after trimming.
- `text` max length: 2,000 characters (prevents excessive prompt cost/abuse).

**Authentication:** None.

**Error cases**
| Status | Condition | Response body |
|---|---|---|
| 400 | Missing/empty `text` | `{ "error": "Task text is required." }` |
| 400 | `text` exceeds 2,000 characters | `{ "error": "Input too long. Please shorten your task list." }` |
| 502 | Claude API fails or returns unparseable JSON after retry | `{ "error": "AI parsing failed. Please try again." }` |
| 504 | Claude API timeout | `{ "error": "Request timed out. Please try again." }` |

---

## 2. `GET /api/tasks`

**Purpose:** Retrieve all stored tasks (PRD FR-8 — persistence; supports both "All Tasks" and "Today's Plan" views).

**Request**
- Query param (optional): `?completed=false` to filter to incomplete tasks only (used by the planning flow).

**Response — 200 OK**
```json
{
  "tasks": [
    {
      "id": "a3f1c2e0-8b2d-4e3a-9c1f-7d6e5b4a3c21",
      "title": "Finish quarterly report",
      "category": "Work",
      "urgency": "High",
      "estimatedTime": 90,
      "completed": false,
      "completedAt": null,
      "createdAt": "2026-07-31T09:15:00.000Z"
    }
  ]
}
```

**Validation:** `completed` query param, if present, must be `"true"` or `"false"`.

**Authentication:** None.

**Error cases**
| Status | Condition | Response body |
|---|---|---|
| 400 | Invalid `completed` query value | `{ "error": "Invalid filter value." }` |
| 500 | Storage read failure | `{ "error": "Could not load tasks." }` |

---

## 3. `POST /api/tasks`

**Purpose:** Save a confirmed task (from the parse-review flow, or a manually added task) to persistent storage (PRD FR-3).

**Request**
```json
{
  "title": "Finish quarterly report",
  "category": "Work",
  "urgency": "High",
  "estimatedTime": 90
}
```

**Response — 201 Created**
```json
{
  "task": {
    "id": "a3f1c2e0-8b2d-4e3a-9c1f-7d6e5b4a3c21",
    "title": "Finish quarterly report",
    "category": "Work",
    "urgency": "High",
    "estimatedTime": 90,
    "completed": false,
    "completedAt": null,
    "createdAt": "2026-07-31T09:15:00.000Z"
  }
}
```

**Validation** (per SCHEMA.md)
- `title`: required, 1–200 chars after trim.
- `category`: required, must be one of `Work | Personal | Health | Errands | Other`.
- `urgency`: required, must be one of `High | Medium | Low`.
- `estimatedTime`: optional; if provided, integer 5–480; defaults to 30 if omitted.
- `id`, `completed`, `completedAt`, `createdAt` are ignored if sent by the client — always server-generated.

**Authentication:** None.

**Error cases**
| Status | Condition | Response body |
|---|---|---|
| 400 | Missing/invalid `title` | `{ "error": "Task title is required." }` |
| 400 | Invalid `category` or `urgency` value | `{ "error": "Invalid category or urgency value." }` |
| 400 | `estimatedTime` out of range | `{ "error": "Estimated time must be between 5 and 480 minutes." }` |
| 500 | Storage write failure | `{ "error": "Could not save task." }` |

---

## 4. `PATCH /api/tasks/:id`

**Purpose:** Update an existing task — primarily used to mark complete/incomplete (PRD FR-5), but also supports editing fields.

**Request**
```json
{ "completed": true }
```
*(Any subset of `title`, `category`, `urgency`, `estimatedTime`, `completed` may be included.)*

**Response — 200 OK**
```json
{
  "task": {
    "id": "a3f1c2e0-8b2d-4e3a-9c1f-7d6e5b4a3c21",
    "title": "Finish quarterly report",
    "category": "Work",
    "urgency": "High",
    "estimatedTime": 90,
    "completed": true,
    "completedAt": "2026-07-31T14:02:00.000Z",
    "createdAt": "2026-07-31T09:15:00.000Z"
  }
}
```

**Validation**
- `:id` must correspond to an existing task.
- Any included fields follow the same rules as `POST /api/tasks`.
- If `completed` is set to `true`, server sets `completedAt` to the current timestamp and triggers a streak recalculation (see `GET /api/streak`). If set back to `false`, `completedAt` is cleared.

**Authentication:** None.

**Error cases**
| Status | Condition | Response body |
|---|---|---|
| 404 | Task ID not found | `{ "error": "Task not found." }` |
| 400 | Invalid field values | `{ "error": "Invalid update data." }` |
| 500 | Storage write failure | `{ "error": "Could not update task." }` |

---

## 5. `DELETE /api/tasks/:id`

**Purpose:** Permanently remove a task (PRD FR-6).

**Request:** No body required.

**Response — 200 OK**
```json
{ "deleted": true, "id": "a3f1c2e0-8b2d-4e3a-9c1f-7d6e5b4a3c21" }
```

**Validation:** `:id` must correspond to an existing task.

**Authentication:** None.

**Error cases**
| Status | Condition | Response body |
|---|---|---|
| 404 | Task ID not found | `{ "error": "Task not found." }` |
| 500 | Storage write failure | `{ "error": "Could not delete task." }` |

---

## 6. `POST /api/generate-plan`

**Purpose:** Generate an AI-prioritized "Today's Plan" from current incomplete tasks (PRD FR-4).

**Request**
```json
{}
```
*(No body needed — server reads current incomplete tasks directly from storage to avoid client/server data drift.)*

**Response — 200 OK**
```json
{
  "plan": [
    { "taskId": "a3f1c2e0-8b2d-4e3a-9c1f-7d6e5b4a3c21", "order": 1, "reasoning": "Hard deadline today — do this first." },
    { "taskId": "b7e2d3f1-9c3e-5f4b-0d2f-8e7f6c5b4d32", "order": 2, "reasoning": "Quick win, clears mental space." }
  ]
}
```

**Response — 200 OK (no incomplete tasks)**
```json
{ "plan": [], "message": "No tasks to plan. Add something to get started." }
```

**Validation:** None required on request (empty body). Server-side: if there are zero incomplete tasks, short-circuits and returns the empty-state response without calling Claude.

**Authentication:** None.

**Error cases**
| Status | Condition | Response body |
|---|---|---|
| 502 | Claude API fails or returns unparseable JSON after retry | `{ "error": "Could not generate a plan. Please try again." }` |
| 504 | Claude API timeout | `{ "error": "Request timed out. Please try again." }` |

---

## 7. `GET /api/streak`

**Purpose:** Retrieve the current completion streak for display on the dashboard (PRD FR-7).

**Request:** None.

**Response — 200 OK**
```json
{ "currentStreak": 4, "lastCompletionDate": "2026-07-31" }
```

**Validation:** None (read-only, no params).

**Authentication:** None.

**Error cases**
| Status | Condition | Response body |
|---|---|---|
| 500 | Storage read failure | `{ "error": "Could not load streak data." }` |

---

## 8. Cross-Cutting Concerns

- **CORS:** only the deployed frontend's exact origin is allowed in production (`CORS_ORIGIN` env var); `*` is never used in production, per ARCHITECTURE.md.
- **Rate limiting:** not implemented in v1.0 (single-user, low traffic) — explicitly deferred, not a gap, since PRD doesn't require it.
- **Consistent error shape:** every error response across all endpoints follows `{ "error": "<human-readable message>" }` so the frontend can handle errors generically.
- **No endpoint requires authentication** — this is intentional and matches the PRD's explicit v1.0 exclusion of accounts/auth. Revisit this section first if v2.0 introduces multi-user support.