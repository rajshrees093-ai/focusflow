# SCHEMA.md — FocusFlow Data Design

**Storage:** JSON-file-backed store (`/server/store/tasks.json`) — no database, per PRD v1.0 scope (single-user, no accounts).

Even without a relational/document database, FocusFlow's data still needs a strict, validated shape. This document defines that shape as if it were a schema, since Day 3's backend implementation will enforce these exact rules.

---

## 1. Entity: Task

The only entity FocusFlow needs to persist in v1.0.

| Field | Type | Required | Description | Constraints |
|---|---|---|---|---|
| `id` | string (UUID) | Yes | Unique task identifier | Generated server-side on creation; never client-supplied |
| `title` | string | Yes | The task description | 1–200 characters; cannot be empty/whitespace-only |
| `category` | string (enum) | Yes | AI-inferred or user-edited category | One of: `Work`, `Personal`, `Health`, `Errands`, `Other` |
| `urgency` | string (enum) | Yes | AI-inferred or user-edited urgency | One of: `High`, `Medium`, `Low` |
| `estimatedTime` | number | Yes | Estimated minutes to complete | Integer, 5–480 (5 min to 8 hrs); defaults to 30 if AI omits it |
| `completed` | boolean | Yes | Completion state | Defaults to `false` on creation |
| `completedAt` | string (ISO date) or null | No | Timestamp of completion | Set automatically when `completed` flips to `true`; cleared if reopened |
| `createdAt` | string (ISO date) | Yes | Creation timestamp | Set server-side, immutable |

### Example record
```json
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
```

### File shape
`tasks.json` is a single JSON array of Task records:
```json
[
  { "id": "...", "title": "...", "...": "..." },
  { "id": "...", "title": "...", "...": "..." }
]
```

---

## 2. Entity: Streak (derived/lightweight)

Not a separate file — stored as a small metadata object alongside tasks, since it's a single-user app with a single streak value.

| Field | Type | Required | Description | Constraints |
|---|---|---|---|---|
| `currentStreak` | number | Yes | Consecutive days with ≥1 completed task | Integer ≥ 0 |
| `lastCompletionDate` | string (date, YYYY-MM-DD) or null | No | Date of the most recent completion | Used to detect streak breaks/continuations |

Stored in `/server/store/streak.json`:
```json
{ "currentStreak": 4, "lastCompletionDate": "2026-07-31" }
```

**Update rule:** on any task completion, compare `lastCompletionDate` to today:
- Same day → no change to `currentStreak`.
- Exactly one day later → increment `currentStreak`, update date.
- More than one day later → reset `currentStreak` to 1, update date.

---

## 3. Relationships

FocusFlow's data model is intentionally flat — there is exactly one entity (`Task`) plus one small derived metadata object (`Streak`). There are **no relationships between tasks** (no parent/child, no dependencies, no categories-as-separate-entities) because the PRD does not require any. Introducing relational structure here would be scope creep against a v1.0 that explicitly excludes multi-user, sharing, or hierarchical task features.

If category needed to become a first-class entity in a future version (e.g., user-defined categories), it would become:
```
Task.category (string) → Category.id (foreign key)
```
This is explicitly deferred, per the PRD's "Future Scope."

---

## 4. Validation Rules (enforced server-side, Day 3)

| Rule | Applies to | Enforcement point |
|---|---|---|
| `title` must be non-empty after trimming | Create/Update | `POST /api/tasks`, `PATCH /api/tasks/:id` |
| `category` must be one of the 5 allowed values | Create/Update | Reject with `400` if invalid |
| `urgency` must be one of the 3 allowed values | Create/Update | Reject with `400` if invalid |
| `estimatedTime` must be a positive integer ≤ 480 | Create/Update | Clamp or reject with `400` |
| `id` cannot be client-supplied on create | Create | Server always generates via UUID |
| AI-parsed tasks are never auto-saved | Parsing flow | `/api/parse-tasks` returns data only; nothing is written to `tasks.json` until the user confirms via `POST /api/tasks` |

---

## 5. Schema Validated Against PRD User Stories / Functional Requirements

| PRD Requirement | Covered by schema? | How |
|---|---|---|
| FR-1: free-text task input | N/A (schema is post-parsing) | Input itself isn't stored; only parsed output is |
| FR-2: AI parsing returns title/category/urgency/estimatedTime | ✅ | Matches Task fields exactly |
| FR-3: parsed tasks reviewable before saving | ✅ | Enforced structurally — parse endpoint never writes to `tasks.json` |
| FR-4: AI-generated prioritized daily plan | ✅ | Plan is computed from stored Task fields (`urgency`, `estimatedTime`, `category`); no separate "Plan" entity needed since it's regenerated on demand, not persisted |
| FR-5: mark task complete | ✅ | `completed` + `completedAt` fields |
| FR-6: delete task | ✅ | Deletion removes the record from `tasks.json`; no soft-delete needed for single-user v1.0 |
| FR-7: streak/progress indicator | ✅ | Covered by the Streak entity |
| FR-8: persistence across reloads | ✅ | File-backed storage survives page reloads and server restarts |
| FR-9/FR-10: responsiveness, graceful error handling | N/A (UI/infra concern, not data) | Handled in ARCHITECTURE.md and API.md |

**Conclusion:** every functional requirement that touches data is fully covered by this two-entity schema. No additional fields or entities are needed for v1.0, and none were added beyond what the PRD requires.