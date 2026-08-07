// server/index.js
// Day 9: adds a 404 handler and a generic error-handling middleware
// for production resilience — no unhandled crashes reach the client
// as raw stack traces.

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const tasksRouter = require('./routes/tasks');
const parseTasksRouter = require('./routes/parseTasks');
const generatePlanRouter = require('./routes/generatePlan');
const streakRouter = require('./routes/streak');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'FocusFlow server is running' });
});

app.use('/api/tasks', tasksRouter);
app.use('/api/parse-tasks', parseTasksRouter);
app.use('/api/generate-plan', generatePlanRouter);
app.use('/api/streak', streakRouter);

// 404 handler — any unmatched route
app.use((req, res) => {
  res.status(404).json({ error: 'Not found.' });
});

// Generic error handler — catches anything thrown/passed to next()
// so a real crash never leaks a raw stack trace to the client.
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({ error: 'Something went wrong on our end.' });
});

app.listen(PORT, () => {
  console.log(`FocusFlow server listening on port ${PORT}`);
});