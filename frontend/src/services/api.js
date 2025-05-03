const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export async function fetchRisk(data) {
  const res = await fetch(`${API_URL}/api/risk`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function fetchCertificate(data) {
  const res = await fetch(`${API_URL}/api/certificate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const blob = await res.blob();
  return URL.createObjectURL(blob);
}
