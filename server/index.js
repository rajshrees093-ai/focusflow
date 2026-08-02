// server/index.js
// Entry point for the Express backend. Loads config, sets up CORS,
// and registers routes. Today (Day 4) adds the full tasks CRUD router.

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const tasksRouter = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

// Hello World / health-check route from Day 3
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'FocusFlow server is running' });
});

// Task CRUD — built Day 4
app.use('/api/tasks', tasksRouter);

app.listen(PORT, () => {
  console.log(`FocusFlow server listening on port ${PORT}`);
});