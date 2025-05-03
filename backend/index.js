const express = require('express');
const PDFDocument = require('pdfkit');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// PDF certificate endpoint
app.post('/api/certificate', (req, res) => {
  const { name, course } = req.body;
  const doc = new PDFDocument({ size: 'LETTER', margin: 50 });
  let buffers = [];
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {
    const pdf = Buffer.concat(buffers);
    res
      .writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="certificate.pdf"',
        'Content-Length': pdf.length,
      })
      .end(pdf);
  });

  doc.fontSize(20).text(course, { align: 'center' })
     .moveDown(1)
     .fontSize(16).text('Certificate of Completion', { align: 'center' })
     .moveDown(2)
     .fontSize(14).text(`This certifies that`, { align: 'center' })
     .moveDown(0.5)
     .fontSize(18).text(name, { align: 'center', underline: true })
     .moveDown(0.5)
     .fontSize(14).text(`has completed the course on ${new Date().toLocaleDateString()}`, { align: 'center' });

  doc.end();
});

// Weighted risk endpoint
app.post('/api/risk', (req, res) => {
  const { age, priorUse, mentalHealth, earlyRefills, surgeryType } = req.body;
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

  // Major surgery type: +1 (case‑insensitive match)
  if (/major/i.test(surgeryType)) points += 1;

  // Scale total (max 13) to a 0–100 score
  const maxPoints = 13;
  const score = Math.round((points / maxPoints) * 100);

  // Flag thresholds
  const flag = score < 30
    ? 'green'
    : score < 60
      ? 'amber'
      : 'red';

  res.json({ score, flag });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API listening on ${PORT}`));