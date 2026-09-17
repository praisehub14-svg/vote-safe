const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const otpStore = new Map(); // demo-only OTP store

const JWT_SECRET = process.env.JWT_SECRET || 'demo_secret';

// Register a voter (demo: allow by student id)
router.post('/register', async (req, res) => {
  const { studentId, name } = req.body;
  if (!studentId) return res.status(400).json({ error: 'studentId required' });
  try {
    const voter = await prisma.voter.upsert({ where: { studentId }, update: { name }, create: { studentId, name, allowed: true } });
    res.json({ ok: true, voter });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Request OTP (demo) - in real system send email/SMS
router.post('/auth/request-otp', (req, res) => {
  const { studentId } = req.body;
  if (!studentId) return res.status(400).json({ error: 'studentId required' });
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(studentId, otp);
  console.log(`[demo] OTP for ${studentId}: ${otp}`);
  res.json({ ok: true, message: 'OTP generated (check server logs in demo)' });
});

// Verify OTP and return JWT
router.post('/auth/verify-otp', async (req, res) => {
  const { studentId, otp } = req.body;
  if (!studentId || !otp) return res.status(400).json({ error: 'studentId and otp required' });
  const expected = otpStore.get(studentId);
  if (!expected || expected !== otp) return res.status(401).json({ error: 'Invalid OTP' });
  // ensure voter exists and is allowed
  const voter = await prisma.voter.findUnique({ where: { studentId } });
  if (!voter || !voter.allowed) return res.status(403).json({ error: 'Voter not allowed' });
  const token = jwt.sign({ sub: voter.id, studentId: voter.studentId }, JWT_SECRET, { expiresIn: '4h' });
  otpStore.delete(studentId);
  res.json({ ok: true, token });
});

module.exports = router;
