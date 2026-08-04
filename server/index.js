// server/index.js
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

app.listen(PORT, () => {
  console.log(`FocusFlow server listening on port ${PORT}`);
});