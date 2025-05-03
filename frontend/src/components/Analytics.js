import React, { useState } from 'react';

export default function Analytics() {
  // Dummy metrics
  const data = {
    completionRate: 72,      // percent
    avgQuizScore: 85,        // out of 100
    riskToolUses: 45,        // total uses
    videoCompletions: 30     // total completions
  };

  const [weeklyDigest, setWeeklyDigest] = useState(true);

  return (
    <div>
      <h2>Analytics Dashboard</h2>
      <ul>
        <li><strong>Course Completion Rate:</strong> {data.completionRate}%</li>
        <li><strong>Average Quiz Score:</strong> {data.avgQuizScore}%</li>
        <li><strong>Risk Tool Usage:</strong> {data.riskToolUses} times</li>
        <li><strong>Video Role-Play Completions:</strong> {data.videoCompletions}</li>
      </ul>
      <div style={{ marginTop: '1rem' }}>
        <label>
          <input
            type="checkbox"
            checked={weeklyDigest}
            onChange={e => setWeeklyDigest(e.target.checked)}
          />{' '}
          Send me a weekly progress digest
        </label>
      </div>
    </div>
  );
}
