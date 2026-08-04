// server/routes/generatePlan.js
// POST /api/generate-plan — matches docs/API.md exactly.
// Currently rule-based (sorts by urgency, then quickest first) — same
// free-tools deviation as Day 5's parser. Swappable for a real Claude
// call later without changing this route's contract.

const express = require('express');
const { readTasks } = require('../store/taskStore');

const router = express.Router();

const URGENCY_RANK = { High: 0, Medium: 1, Low: 2 };

function reasoningFor(task) {
  if (task.urgency === 'High') return 'High urgency — tackle this first.';
  if (task.urgency === 'Medium') return 'Moderate priority — fits in after your urgent tasks.';
  return 'Low urgency — flexible, do this when you have space.';
}

router.post('/', (req, res) => {
  try {
    const tasks = readTasks().filter((t) => !t.completed);

    if (tasks.length === 0) {
      return res.json({ plan: [], message: 'No tasks to plan. Add something to get started.' });
    }

    const sorted = [...tasks].sort((a, b) => {
      const urgencyDiff = URGENCY_RANK[a.urgency] - URGENCY_RANK[b.urgency];
      if (urgencyDiff !== 0) return urgencyDiff;
      return a.estimatedTime - b.estimatedTime;
    });

    const plan = sorted.map((task, i) => ({
      taskId: task.id,
      order: i + 1,
      reasoning: reasoningFor(task),
    }));

    res.json({ plan });
  } catch (err) {
    res.status(500).json({ error: 'Could not generate a plan. Please try again.' });
  }
});

module.exports = router;