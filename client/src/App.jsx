// client/src/App.jsx
// Day 6: wires TodaysPlan, AllTasks, StreakBadge together into a
// complete MVP, plus the required challenge footer.

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
  const [serverStatus, setServerStatus] = useState('checking...');
  const [parsedTasks, setParsedTasks] = useState([]);
  const [confirmation, setConfirmation] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    checkHealth()
      .then((data) => setServerStatus(data.message))
      .catch(() => setServerStatus('Could not reach server'));
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
      <header>
        <h1>FocusFlow</h1>
        {(view === 'plan' || view === 'all') && (
          <NavTabs activeTab={view} onChange={setView} />
        )}
        <StreakBadge refreshKey={refreshKey} />
      </header>
      <main>
        {view === 'plan' && (
          <div className="screen">
            <div className="screen-header">
              <h2>Today's Plan</h2>
              <button onClick={() => setView('input')}>+ Add Tasks</button>
            </div>
            {confirmation && <p className="success-text">{confirmation}</p>}
            <TodaysPlan refreshKey={refreshKey} onTaskChanged={bumpRefresh} />
          </div>
        )}

        {view === 'all' && (
          <div className="screen">
            <div className="screen-header">
              <h2>All Tasks</h2>
              <button onClick={() => setView('input')}>+ Add Tasks</button>
            </div>
            {confirmation && <p className="success-text">{confirmation}</p>}
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

        <p className="status">Backend status: {serverStatus}</p>
      </main>
      <footer className="app-footer">
        Built with Claude as part of the AB Talks 60-Day Claude AI Challenge.
      </footer>
    </div>
  );
}

export default App;