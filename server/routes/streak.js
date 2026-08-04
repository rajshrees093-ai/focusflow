// server/routes/streak.js
// GET /api/streak — matches docs/API.md exactly.

const express = require('express');
const { readStreak } = require('../store/streakStore');

const router = express.Router();

router.get('/', (req, res) => {
  try {
    res.json(readStreak());
  } catch (err) {
    res.status(500).json({ error: 'Could not load streak data.' });
  }
});

module.exports = router;