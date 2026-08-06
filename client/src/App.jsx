// client/src/App.jsx
// Day 7: same view-state logic as Day 6 — refinement adds a skip link,
// a subtle connection-status dot (replacing raw debug text), and an
// aria-live region so screen readers announce confirmations/errors.

import { useState, useEffect } from 'react';
import NavTabs from './components/NavTabs';
import TaskInput from './components/TaskInput';
import ParsedTaskReview from './components/ParsedTaskReview';
import TodaysPlan from './components/TodaysPlan';
import AllTasks from './components/AllTasks';
import StreakBadge from './components/StreakBadge';
import { checkHealth } from './api/client';
import './App.css';

function App() {
  const [view, setView] = useState('plan');
  const [serverOk, setServerOk] = useState(null); // null = checking, true/false after
  const [parsedTasks, setParsedTasks] = useState([]);
  const [confirmation, setConfirmation] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    checkHealth()
      .then(() => setServerOk(true))
      .catch(() => setServerOk(false));
  }, []);

  function bumpRefresh() {
    setRefreshKey((k) => k + 1);
  }

  function handleParsed(tasks) {
    setParsedTasks(tasks);
    setView('review');
  }

  function handleConfirmed(count) {
    setConfirmation(`${count} task${count === 1 ? '' : 's'} added.`);
    setParsedTasks([]);
    setView('plan');
    bumpRefresh();
    setTimeout(() => setConfirmation(''), 4000);
  }

  return (
    <div className="app">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <header>
        <h1>FocusFlow</h1>
        {(view === 'plan' || view === 'all') && (
          <NavTabs activeTab={view} onChange={setView} />
        )}
        <StreakBadge refreshKey={refreshKey} />
      </header>
      <main id="main-content">
        <div aria-live="polite">
          {confirmation && <p className="success-text">{confirmation}</p>}
        </div>

        {view === 'plan' && (
          <div className="screen">
            <div className="screen-header">
              <h2>Today's Plan</h2>
              <button className="btn" onClick={() => setView('input')}>+ Add Tasks</button>
            </div>
            <TodaysPlan refreshKey={refreshKey} onTaskChanged={bumpRefresh} />
          </div>
        )}

        {view === 'all' && (
          <div className="screen">
            <div className="screen-header">
              <h2>All Tasks</h2>
              <button className="btn" onClick={() => setView('input')}>+ Add Tasks</button>
            </div>
            <AllTasks refreshKey={refreshKey} onTaskChanged={bumpRefresh} />
          </div>
        )}

        {view === 'input' && (
          <TaskInput onParsed={handleParsed} onCancel={() => setView('plan')} />
        )}

        {view === 'review' && (
          <ParsedTaskReview
            tasks={parsedTasks}
            onConfirmed={handleConfirmed}
            onBack={() => setView('input')}
          />
        )}

        <div className="status-row" role="status">
          <span className={`status-dot ${serverOk === true ? 'ok' : serverOk === false ? 'error' : ''}`} />
          <span>{serverOk === null ? 'Connecting...' : serverOk ? 'Connected' : 'Server unreachable'}</span>
        </div>
      </main>
      <footer className="app-footer">
        Built with Claude as part of the AB Talks 60-Day Claude AI Challenge.
      </footer>
    </div>
  );
}

export default App;