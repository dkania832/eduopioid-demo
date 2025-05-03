import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Certificate from './components/Certificate';
import RiskTool from './components/RiskTool';
import Analytics from './components/Analytics';   // ← NEW

function App() {
  return (
    <Router>
      <nav style={{ padding: '1rem', background: '#e0f7fa' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        <Link to="/certificate" style={{ marginRight: '1rem' }}>Certificate</Link>
        <Link to="/risk" style={{ marginRight: '1rem' }}>Risk Tool</Link>
        <Link to="/analytics">Analytics</Link>
      </nav>
      <div style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<div>Home – course overview coming soon</div>} />
          <Route path="/certificate" element={<Certificate />} />
          <Route path="/risk" element={<RiskTool />} />
          <Route 
            path="/analytics" 
            element={<Analytics />}    // ← UPDATED
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
