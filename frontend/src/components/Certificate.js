import React, { useState } from 'react';
import { fetchCertificate } from '../services/api';

export default function Certificate() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const download = async () => {
    if (!name) return alert('Please enter your name');
    setLoading(true);
    try {
      const url = await fetchCertificate({ name, course: 'EduOpioid Course' });
      const a = document.createElement('a');
      a.href = url;
      a.download = 'certificate.pdf';
      a.click();
    } catch (err) {
      alert('Error generating certificate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Download Your Certificate</h2>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Enter your full name"
        style={{ marginRight: '0.5rem' }}
      />
      <button onClick={download} disabled={loading}>
        {loading ? 'Generating…' : 'Download Certificate'}
      </button>
    </div>
  );
}