import React, { useState } from 'react';
import jsPDF from 'jspdf';

export default function Certificate() {
  const [name, setName] = useState('');

  const download = () => {
    if (!name.trim()) return alert('Please enter your name');
    const doc = new jsPDF('landscape', undefined, 'letter');
    const date = new Date().toLocaleDateString();
    doc.setFontSize(24);
    doc.text('Certificate of Completion', 105, 40, { align: 'center' });
    doc.setFontSize(16);
    doc.text('This certifies that', 105, 60, { align: 'center' });
    doc.setFontSize(20);
    doc.text(name.trim(), 105, 75, { align: 'center' });
    doc.setFontSize(16);
    doc.text('has completed the EduOpioid Course', 105, 95, { align: 'center' });
    doc.text(`on ${date}`, 105, 110, { align: 'center' });
    doc.save('certificate.pdf');
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
      <button onClick={download}>Download Certificate</button>
    </div>
  );
}