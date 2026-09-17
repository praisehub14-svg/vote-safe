const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();

exports.submitVote = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be signed in');
  }

  const uid = context.auth.uid;
  const email = context.auth.token.email || null;
  const candidate = data && data.candidate;
  if (!candidate || typeof candidate !== 'string') {
    throw new functions.https.HttpsError('invalid-argument', 'Missing or invalid candidate');
  }

  const voteRef = db.collection('votes').doc(uid);

  try {
    await db.runTransaction(async (tx) => {
      const snap = await tx.get(voteRef);
      if (snap.exists) {
        throw new functions.https.HttpsError('already-exists', 'User has already voted');
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
        candidate,
        time: admin.firestore.FieldValue.serverTimestamp()
      });
    });
  } catch (err) {
    if (err instanceof functions.https.HttpsError) throw err;
    console.error('submitVote error', err);
    throw new functions.https.HttpsError('internal', 'Failed to submit vote');
  }

  return { success: true };
});
