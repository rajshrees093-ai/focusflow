// client/src/components/AllTasks.jsx
// PRD FR-5, FR-6: full task list with complete/delete.

import { useState, useEffect } from 'react';
import { fetchTasks, updateTask, deleteTask } from '../api/client';

export default function AllTasks({ refreshKey, onTaskChanged }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  async function load() {
    setLoading(true);
    setError('');
    try {
      const data = await fetchTasks();
      setTasks(data.tasks);
    } catch (err) {
      setError(err.message || 'Could not load tasks.');
    } finally {
      setLoading(false);
    }
  }

  async function toggleComplete(task) {
    try {
      await updateTask(task.id, { completed: !task.completed });
      onTaskChanged();
    } catch (err) {
      setError(err.message || 'Could not update task.');
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this task?')) return;
    try {
      await deleteTask(id);
      onTaskChanged();
    } catch (err) {
      setError(err.message || 'Could not delete task.');
    }
  }

  if (loading) return <p className="muted-text">Loading tasks...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (tasks.length === 0) return <p className="muted-text">No tasks yet. Add your first ones above.</p>;

  return (
    <div className="all-tasks-list">
      {tasks.map((task) => (
        <div className={`all-task-row ${task.completed ? 'completed' : ''}`} key={task.id}>
          <input type="checkbox" checked={task.completed} onChange={() => toggleComplete(task)} />
          <span className="all-task-title">{task.title}</span>
          <span className={`tag tag-${task.category.toLowerCase()}`}>{task.category}</span>
          <span className={`tag tag-urgency-${task.urgency.toLowerCase()}`}>{task.urgency}</span>
          <button className="icon-btn" onClick={() => handleDelete(task.id)} aria-label="Delete task">🗑</button>
        </div>
      ))}
    </div>
  );
}