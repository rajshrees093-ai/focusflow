// client/src/components/ErrorBoundary.jsx
// Catches render errors anywhere below it and shows a friendly fallback
// instead of a blank white screen — required for a confident public release.

import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('FocusFlow crashed:', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="screen empty-state" role="alert">
          <span className="empty-icon" aria-hidden="true">⚠️</span>
          <p>Something went wrong. This has been logged.</p>
          <button className="btn" onClick={this.handleReset} style={{ marginTop: '1rem' }}>
            Reload FocusFlow
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;