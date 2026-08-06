// client/src/components/TodaysPlan.jsx
// Day 7: polished loading/empty/error states. Same logic as Day 6.

import { useState, useEffect } from 'react';
import { fetchTasks, generatePlan, updateTask } from '../api/client';

export default function TodaysPlan({ refreshKey, onTaskChanged }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  async function load() {
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const [tasksData, planData] = await Promise.all([fetchTasks(false), generatePlan()]);
      if (planData.plan.length === 0) {
        setItems([]);
        setMessage(planData.message || 'No tasks to plan.');
        setLoading(false);
        return;
      }
      const taskMap = Object.fromEntries(tasksData.tasks.map((t) => [t.id, t]));
      const merged = planData.plan
        .map((p) => ({ ...taskMap[p.taskId], order: p.order, reasoning: p.reasoning }))
        .filter((item) => item.id);
      setItems(merged);
    } catch (err) {
      setError(err.message || 'Could not load your plan.');
    } finally {
      setLoading(false);
    }
  }

  async function handleComplete(id) {
    try {
      await updateTask(id, { completed: true });
      onTaskChanged();
    } catch (err) {
      setError(err.message || 'Could not update task.');
    }
  }

  if (loading) return <p className="loading-text">Building your plan...</p>;
  if (error) return <p className="error-banner" role="alert">{error}</p>;
  if (message) {
    return (
      <div className="empty-state">
        <span className="empty-icon" aria-hidden="true">📋</span>
        {message}
      </div>
    );
  }

  return (
    <div className="plan-list">
      {items.map((item) => (
        <div className="plan-row" key={item.id}>
          <input
            type="checkbox"
            onChange={() => handleComplete(item.id)}
            aria-label={`Mark "${item.title}" complete`}
          />
          <div className="plan-row-body">
            <div className="plan-row-title">
              {item.order}. {item.title} <span className={`tag tag-${item.category.toLowerCase()}`}>{item.category}</span>
            </div>
            <div className="plan-row-reasoning">"{item.reasoning}"</div>
          </div>
        </div>
      ))}
      <button className="secondary" onClick={load}>Regenerate Plan</button>
    </div>
  );
}