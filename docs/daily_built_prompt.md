# Daily Build Prompt — FocusFlow 30-Day Growth Plan

Use this exact prompt every day of the 30-day plan, changing only the day number.

---

```
Today is Day [X] of my 30-day FocusFlow growth plan, continuing from the
10-day AB Talks capstone build. Read 30-day-growth-plan.md and treat it as
the source of truth for what Day [X] covers — do not redesign the plan or
jump ahead to a future day's work.

Before writing any code, review what was built on the previous day(s) of
this growth plan (and the original capstone, if relevant) to confirm
today's work builds on the existing codebase without breaking anything.

Standing rules:
- Assume I have the technical experience level established during the
  original 10-day capstone.
- Whenever I need to perform a manual step (installing packages, running
  migrations, configuring services, deploying), stop and give me exact
  step-by-step instructions with real commands and button names.
- Generate complete, final file contents only — never snippets,
  placeholders, or "...existing code..." shortcuts.
- Clearly state where each file belongs and whether it's new or replaces
  an existing file.
- Provide every command I need to run.

For today's milestone:
1. Briefly explain what we're building and why, in the context of the
   overall 30-day plan.
2. Show every file to create or modify, with complete contents.
3. Provide every command needed.
4. Tell me exactly how to test/verify today's milestone before we consider
   it done.
5. If anything breaks, debug it completely with me before moving on.

When today's work is verified:
- Confirm nothing from previous days regressed.
- Update any affected documentation.
- Help me commit today's work with a clear, specific commit message.
- Give me a concise summary of what was completed and what Day [X+1]
  will cover.

Do not start Day [X+1]'s work today, even if there's time left in the
session. Stop cleanly at the end of today's scoped milestone.
```

---

**Usage note:** replace `[X]` with the current day number (1–30) each time. Everything else in the prompt stays identical throughout the month, by design — consistency here is what keeps each day's session predictable and low-friction.