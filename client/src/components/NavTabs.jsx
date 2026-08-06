// client/src/components/NavTabs.jsx
// Day 7: adds proper tablist/tab ARIA roles for screen reader support.
// Same two-tab behavior as Day 3 — no functional change.

export default function NavTabs({ activeTab, onChange }) {
  return (
    <nav className="nav-tabs" role="tablist" aria-label="Main navigation">
      <button
        role="tab"
        aria-selected={activeTab === 'plan'}
        className={activeTab === 'plan' ? 'active' : ''}
        onClick={() => onChange('plan')}
      >
        Today's Plan
      </button>
      <button
        role="tab"
        aria-selected={activeTab === 'all'}
        className={activeTab === 'all' ? 'active' : ''}
        onClick={() => onChange('all')}
      >
        All Tasks
      </button>
    </nav>
  );
}