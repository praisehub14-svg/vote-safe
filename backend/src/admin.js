const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const crypto = require('crypto');

const KEYS_DIR = path.join(__dirname, '..', 'keys');
const PRIV_PATH = path.join(KEYS_DIR, 'private.pem');
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'admin-demo-token';

function requireAdmin(req, res, next){
  const token = req.header('x-admin-token');
  if(!token || token !== ADMIN_TOKEN) return res.status(401).json({ error: 'admin token required' });
  next();
}

// List ciphertext ballots (admin)
router.get('/ballots/:electionId', requireAdmin, async (req, res) => {
  const { electionId } = req.params;
  const ballots = await prisma.ballot.findMany({ where: { electionId: Number(electionId) } });
  res.json(ballots);
});

// Decrypt and tally (admin) - simple demo using RSA private key and AES-GCM symmetric
router.get('/results/:electionId', requireAdmin, async (req, res) => {
  if(!fs.existsSync(PRIV_PATH)) return res.status(500).json({ error: 'private key not found; run gen:keys' });
  const privatePem = fs.readFileSync(PRIV_PATH,'utf8');
  const ballots = await prisma.ballot.findMany({ where: { electionId: Number(req.params.electionId) } });
  const counts = {};
  for(const b of ballots){
    try{
      // encKey is base64 of RSA-encrypted symmetric key
      const encKeyBuf = Buffer.from(b.encKey, 'base64');
      const symmetricKey = crypto.privateDecrypt({key: privatePem, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, oaepHash:'sha256'}, encKeyBuf);
      // ciphertext stored as base64 of: iv (12 bytes) + tag (16 bytes) + cipher
      const cipherBuf = Buffer.from(b.ciphertext, 'base64');
      const iv = cipherBuf.slice(0,12);
      const tag = cipherBuf.slice(12,28);
      const ct = cipherBuf.slice(28);
      const decipher = crypto.createDecipheriv('aes-256-gcm', symmetricKey, iv);
      decipher.setAuthTag(tag);
      const plain = Buffer.concat([decipher.update(ct), decipher.final()]);
      const payload = JSON.parse(plain.toString('utf8'));
      const cid = payload.candidateId;
      counts[cid] = (counts[cid] || 0) + 1;
    }catch(err){
      console.error('decrypt failed for ballot', b.id, err.message);
    }
  }
  res.json({ counts });
});

module.exports = router;
