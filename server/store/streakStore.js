// server/store/streakStore.js
// Read/write layer for streak.json, plus the streak recalculation
// rule from docs/SCHEMA.md: same day = no change, next day = +1,
// missed day(s) = reset to 1.

const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, 'streak.json');

function readStreak() {
  const raw = fs.readFileSync(FILE_PATH, 'utf-8');
  return JSON.parse(raw);
}

function writeStreak(streak) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(streak, null, 2));
}

function todayISO() {
  return new Date().toISOString().split('T')[0];
}

function recalcStreakOnCompletion() {
  const streak = readStreak();
  const today = todayISO();

  if (streak.lastCompletionDate === today) {
    return streak;
  }

  if (streak.lastCompletionDate) {
    const last = new Date(streak.lastCompletionDate);
    const diffDays = Math.round((new Date(today) - last) / (1000 * 60 * 60 * 24));
    streak.currentStreak = diffDays === 1 ? streak.currentStreak + 1 : 1;
  } else {
    streak.currentStreak = 1;
  }

  streak.lastCompletionDate = today;
  writeStreak(streak);
  return streak;
}

module.exports = { readStreak, writeStreak, recalcStreakOnCompletion };