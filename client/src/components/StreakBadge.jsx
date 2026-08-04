// client/src/components/StreakBadge.jsx
import { useState, useEffect } from 'react';
import { getStreak } from '../api/client';

export default function StreakBadge({ refreshKey }) {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    getStreak().then((data) => setStreak(data.currentStreak)).catch(() => setStreak(0));
  }, [refreshKey]);

  if (streak === 0) return null;
  return <div className="streak-badge">🔥 {streak}-day streak</div>;
}