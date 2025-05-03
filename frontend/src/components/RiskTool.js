import React, { useState } from 'react';
import { fetchRisk } from '../services/api';

export default function RiskTool() {
  const [formData, setFormData] = useState({
    age: '',
    priorUse: '',
    mentalHealth: '',
    earlyRefills: '',
    surgeryType: ''
  });
  const [result, setResult] = useState(null);
  const [showFormula, setShowFormula] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetchRisk(formData);
      setResult(res);
    } catch (err) {
      alert('Error fetching risk');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Opioid Overuse Risk Assessment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Age:</label>
          <input
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Prior Substance Use Disorder (yes/no):</label>
          <input
            name="priorUse"
            value={formData.priorUse}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mental Health Diagnosis (yes/no):</label>
          <input
            name="mentalHealth"
            value={formData.mentalHealth}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Early Refills Requested (yes/no):</label>
          <input
            name="earlyRefills"
            value={formData.earlyRefills}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Type of Surgery:</label>
          <input
            name="surgeryType"
            value={formData.surgeryType}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Assessing…' : 'Assess Risk'}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: '1rem' }}>
          <div>
            <strong>Risk Score:</strong> {result.score}
          </div>
          <div>
            <strong>Flag:</strong>{' '}
            <span style={{
              color:
                result.flag === 'red' ? 'red' :
                result.flag === 'amber' ? 'orange' :
                'green'
            }}>
              {result.flag.toUpperCase()}
            </span>
          </div>
          <button onClick={() => setShowFormula(!showFormula)}>
            {showFormula ? 'Hide Formula' : 'How to Read This'}
          </button>
          {showFormula && (
            <div style={{ marginTop: '0.5rem', fontStyle: 'italic' }}>
              The score is a dummy metric (0–100).<br/>
              • Green (0–32): Low risk<br/>
              • Amber (33–65): Moderate risk<br/>
              • Red (66–100): High risk<br/>
              In future, this will use weighted factors based on age, prior use, mental‑health status, early refills, and surgery type.
            </div>
          )}
        </div>
      )}
    </div>
  );
}