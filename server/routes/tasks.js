// server/routes/tasks.js
// Full CRUD for tasks, matching docs/API.md exactly:
// GET /api/tasks, POST /api/tasks, PATCH /api/tasks/:id, DELETE /api/tasks/:id

const express = require('express');
const crypto = require('crypto');
const { readTasks, writeTasks } = require('../store/taskStore');

const router = express.Router();

const CATEGORIES = ['Work', 'Personal', 'Health', 'Errands', 'Other'];
const URGENCIES = ['High', 'Medium', 'Low'];

function validateNewTask(body) {
  const errors = [];
  if (!body.title || typeof body.title !== 'string' || !body.title.trim()) {
    errors.push('Task title is required.');
  } else if (body.title.trim().length > 200) {
    errors.push('Task title must be 200 characters or fewer.');
  }
  if (!body.category || !CATEGORIES.includes(body.category)) {
    errors.push('Invalid category value.');
  }
  if (!body.urgency || !URGENCIES.includes(body.urgency)) {
    errors.push('Invalid urgency value.');
  }
  if (body.estimatedTime !== undefined) {
    const t = Number(body.estimatedTime);
    if (!Number.isInteger(t) || t < 5 || t > 480) {
      errors.push('Estimated time must be between 5 and 480 minutes.');
    }
  }
  return errors;
}

// GET /api/tasks  (supports ?completed=true|false)
router.get('/', (req, res) => {
  try {
    let tasks = readTasks();
    if (req.query.completed !== undefined) {
      if (!['true', 'false'].includes(req.query.completed)) {
        return res.status(400).json({ error: 'Invalid filter value.' });
      }
      const wantCompleted = req.query.completed === 'true';
      tasks = tasks.filter((t) => t.completed === wantCompleted);
    }
    res.json({ tasks });
  } catch (err) {
    res.status(500).json({ error: 'Could not load tasks.' });
  }
});

// POST /api/tasks
router.post('/', (req, res) => {
  const errors = validateNewTask(req.body);
  if (errors.length) {
    return res.status(400).json({ error: errors[0] });
  }
  try {
    const tasks = readTasks();
    const task = {
      id: crypto.randomUUID(),
      title: req.body.title.trim(),
      category: req.body.category,
      urgency: req.body.urgency,
      estimatedTime: req.body.estimatedTime ? Number(req.body.estimatedTime) : 30,
      completed: false,
      completedAt: null,
      createdAt: new Date().toISOString(),
    };
    tasks.push(task);
    writeTasks(tasks);
    res.status(201).json({ task });
  } catch (err) {
    res.status(500).json({ error: 'Could not save task.' });
  }
});

// PATCH /api/tasks/:id
router.patch('/:id', (req, res) => {
  try {
    const tasks = readTasks();
    const index = tasks.findIndex((t) => t.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    const updates = {};
    if (req.body.title !== undefined) {
      if (!req.body.title.trim()) return res.status(400).json({ error: 'Task title is required.' });
      updates.title = req.body.title.trim();
    }
    if (req.body.category !== undefined) {
      if (!CATEGORIES.includes(req.body.category)) return res.status(400).json({ error: 'Invalid category value.' });
      updates.category = req.body.category;
    }
    if (req.body.urgency !== undefined) {
      if (!URGENCIES.includes(req.body.urgency)) return res.status(400).json({ error: 'Invalid urgency value.' });
      updates.urgency = req.body.urgency;
    }
    if (req.body.estimatedTime !== undefined) {
      const t = Number(req.body.estimatedTime);
      if (!Number.isInteger(t) || t < 5 || t > 480) {
        return res.status(400).json({ error: 'Estimated time must be between 5 and 480 minutes.' });
      }
      updates.estimatedTime = t;
    }
    if (req.body.completed !== undefined) {
      updates.completed = Boolean(req.body.completed);
      updates.completedAt = updates.completed ? new Date().toISOString() : null;
    }

    tasks[index] = { ...tasks[index], ...updates };
    writeTasks(tasks);
    res.json({ task: tasks[index] });
  } catch (err) {
    res.status(500).json({ error: 'Could not update task.' });
  }
});

// DELETE /api/tasks/:id
router.delete('/:id', (req, res) => {
  try {
    const tasks = readTasks();
    const index = tasks.findIndex((t) => t.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Task not found.' });
    }
    tasks.splice(index, 1);
    writeTasks(tasks);
    res.json({ deleted: true, id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: 'Could not delete task.' });
  }
});

module.exports = router;