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

// Dummy risk endpoint
app.post('/api/risk', (req, res) => {
  const score = Math.floor(Math.random() * 100);
  const flag = score < 33 ? 'green' : score < 66 ? 'amber' : 'red';
  res.json({ score, flag });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API listening on ${PORT}`));