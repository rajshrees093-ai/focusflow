// client/src/components/TaskInput.jsx
// Day 7: adds a character counter and aria-label; same parsing logic as Day 5.

import { useState } from 'react';
import { parseTasks } from '../api/client';

export default function TaskInput({ onParsed, onCancel }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) {
      setError('Please type at least one task.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const data = await parseTasks(text);
      if (!data.tasks || data.tasks.length === 0) {
        setError("Couldn't find any tasks in that. Try rephrasing.");
        setLoading(false);
        return;
      }
      onParsed(data.tasks);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div className="screen task-input">
      <h2>What do you need to do?</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="task-text" className="visually-hidden">Describe your tasks</label>
        <textarea
          id="task-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="finish report by Friday, call mom sometime, gym at 6am tomorrow, buy groceries"
          rows={5}
          disabled={loading}
          maxLength={2000}
          aria-describedby="char-count"
        />
        <div id="char-count" className="char-counter">{text.length}/2000</div>
        {error && <p className="error-text" role="alert">{error}</p>}
        <div className="button-row">
          <button type="button" className="secondary" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Organizing your tasks...' : 'Parse My Tasks →'}
          </button>
        </div>
      </form>
    </div>
  );
}