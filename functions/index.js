const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors');
const express = require('express');

admin.initializeApp();
const db = admin.firestore();

// Create Express app for CORS handling
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Handle submitVote as HTTP request with CORS
app.post('/submitVote', async (req, res) => {
  try {
    // Get auth token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthenticated: missing or invalid auth token' });
    }

    const token = authHeader.substring(7);
    let decodedToken;
    try {
      decodedToken = await admin.auth().verifyIdToken(token);
    } catch (err) {
      return res.status(401).json({ error: 'Unauthenticated: invalid token', details: err.message });
    }

    const uid = decodedToken.uid;
    const email = decodedToken.email || null;
    const candidate = req.body && req.body.candidate;

    if (!candidate || typeof candidate !== 'string') {
      return res.status(400).json({ error: 'Invalid: missing or invalid candidate' });
    }

    const voteRef = db.collection('votes').doc(uid);

    await db.runTransaction(async (tx) => {
      const snap = await tx.get(voteRef);
      if (snap.exists) {
        throw new Error('Already-exists: User has already voted');
      }

      tx.set(voteRef, {
        uid,
        email,
        candidate,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      });

      const eventsRef = db.collection('events').doc();
      tx.set(eventsRef, {
        type: 'vote_submitted',
        uid,
        email,
        candidate,
        time: admin.firestore.FieldValue.serverTimestamp()
      });
    });

    return res.json({ success: true });
  } catch (err) {
    console.error('submitVote error', err);
    if (err.message && err.message.includes('Already-exists')) {
      return res.status(409).json({ error: 'Already-exists', message: 'User has already voted' });
    }
    return res.status(500).json({ error: 'Internal', message: err.message });
  }
});

// Export as callable function
exports.submitVote = functions.https.onRequest(app);
