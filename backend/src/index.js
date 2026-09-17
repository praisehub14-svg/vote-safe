require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
 
const prisma = new PrismaClient();
// Load auth and admin routes
const authRoutes = require('./auth');
const adminRoutes = require('./admin');
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '1mb' }));

const KEYS_DIR = path.join(__dirname, '..', 'keys');
const PUB_PATH = path.join(KEYS_DIR, 'public.pem');

app.get('/api/public-key', async (req, res) => {
  try {
    if (!fs.existsSync(PUB_PATH)) return res.status(404).json({ error: 'Public key not found. Run gen:keys.' });
    const pem = fs.readFileSync(PUB_PATH, 'utf8');
    res.json({ publicKey: pem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// mount auth and admin routes
app.use('/api', authRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/elections', async (req, res) => {
  const elections = await prisma.election.findMany({ include: { candidates: true } });
  res.json(elections);
});

app.post('/api/ballot/submit', async (req, res) => {
  try {
    const { electionId, ciphertext, encKey, meta } = req.body;
    if (!electionId || !ciphertext || !encKey) return res.status(400).json({ error: 'Missing fields' });
    const ballot = await prisma.ballot.create({ data: { electionId, ciphertext, encKey, meta: meta ? JSON.stringify(meta) : null } });
    res.json({ ok: true, id: ballot.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/ballots/:electionId', async (req, res) => {
  const { electionId } = req.params;
  const ballots = await prisma.ballot.findMany({ where: { electionId: Number(electionId) } });
  res.json(ballots);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`VoteSafe backend running on http://localhost:${PORT}`));
