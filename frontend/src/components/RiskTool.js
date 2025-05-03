import React, { useState } from 'react';

export default function RiskTool() {
  const [formData, setFormData] = useState({
    age: '',
    priorUse: '',
    mentalHealth: '',
    earlyRefills: '',
    surgeryType: ''
  });
  const [result, setResult] = useState(null);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const assessRisk = e => {
    e.preventDefault();
    const { age, priorUse, mentalHealth, earlyRefills, surgeryType } = formData;
    let points = 0;

    // Age 18–30 adds 3 points
    const ageNum = parseInt(age, 10);
    if (!isNaN(ageNum) && ageNum >= 18 && ageNum <= 30) points += 3;

    // Prior substance use disorder: +3
    if (priorUse.toLowerCase() === 'yes') points += 3;

    // Mental‑health diagnosis: +2
    if (mentalHealth.toLowerCase() === 'yes') points += 2;

    // Early refills requested: +4
    if (earlyRefills.toLowerCase() === 'yes') points += 4;

    // Major surgery type: +1
    if (/major/i.test(surgeryType)) points += 1;

    // Scale to 0–100
    const score = Math.round((points / 13) * 100);
    const flag = score < 30 ? 'green' : score < 60 ? 'amber' : 'red';

    setResult({ score, flag });
  };

  return (
    <div>
      <h2>Opioid Overuse Risk Assessment</h2>
      <form onSubmit={assessRisk}>
        <div>
          <label>Age:</label>
          <input name="age" value={formData.age} onChange={handleChange} required/>
        </div>
        <div>
          <label>Prior Use (yes/no):</label>
          <input name="priorUse" value={formData.priorUse} onChange={handleChange} required/>
        </div>
        <div>
          <label>Mental Health (yes/no):</label>
          <input name="mentalHealth" value={formData.mentalHealth} onChange={handleChange} required/>
        </div>
        <div>
          <label>Early Refills (yes/no):</label>
          <input name="earlyRefills" value={formData.earlyRefills} onChange={handleChange} required/>
        </div>
        <div>
          <label>Type of Surgery:</label>
          <input name="surgeryType" value={formData.surgeryType} onChange={handleChange} required/>
        </div>
        <button type="submit">Assess Risk</button>
      </form>

      {result && (
        <div style={{ marginTop: '1rem' }}>
          <div><strong>Score:</strong> {result.score}</div>
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
        </div>
      )}
    </div>
  );
}