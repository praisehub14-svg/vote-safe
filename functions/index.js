const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors');

admin.initializeApp();
const db = admin.firestore();

// Enable CORS for all origins (can restrict to specific domains if needed)
const corsHandler = cors({ origin: true });

exports.submitVote = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
      // Get Firebase ID token from Authorization header
      const authHeader = req.headers.authorization || '';
      const idToken = authHeader.replace('Bearer ', '');

      if (!idToken) {
        return res.status(401).json({ error: 'User must be signed in' });
      }

      // Verify the token
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const uid = decodedToken.uid;
      const email = decodedToken.email || null;

      const candidate = req.body && req.body.candidate;
      if (!candidate || typeof candidate !== 'string') {
        return res.status(400).json({ error: 'Missing or invalid candidate' });
      }

      const voteRef = db.collection('votes').doc(uid);

      await db.runTransaction(async (tx) => {
        const snap = await tx.get(voteRef);
        if (snap.exists) {
          throw new Error('User has already voted');
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

      return res.status(200).json({ success: true, message: 'Vote submitted successfully' });
    } catch (err) {
      console.error('submitVote error', err);
      const message = err.message || 'Internal server error';
      return res.status(500).json({ error: message });
    }
  });
});
