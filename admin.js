const adminEmail = 'praise234@gmail.com';

const firebaseConfig = {
  apiKey: 'AIzaSyCRoR8aw1qxlsJgzKuH2O_h9fLqb8KcovU',
  authDomain: 'votesafe-47903.firebaseapp.com',
  databaseURL: 'https://votesafe-47903-default-rtdb.firebaseio.com',
  projectId: 'votesafe-47903',
  storageBucket: 'votesafe-47903.firebasestorage.app',
  messagingSenderId: '467625260000',
  appId: '1:467625260000:web:caaa263b3f8cf183b0f185',
  measurementId: 'G-BMBXCXRMJ0'
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

const totalVotesEl = document.getElementById('totalVotes');
const totalUsersEl = document.getElementById('totalUsers');
const totalCandidatesEl = document.getElementById('totalCandidates');
const winnerNameEl = document.getElementById('winnerName');
const candidateBreakdownEl = document.getElementById('candidateBreakdown');
const liveActivityEl = document.getElementById('liveActivity');
const candidateListEl = document.getElementById('candidateList');
const userListEl = document.getElementById('userList');
const addCandidateForm = document.getElementById('addCandidateForm');
const candidateName = document.getElementById('candidateName');
const candidateParty = document.getElementById('candidateParty');
const signOutAdminBtn = document.getElementById('signOutAdmin');

function renderBreakdown(candidates, voteMap) {
  const totalVotes = Object.values(voteMap).reduce((sum, value) => sum + value, 0);
  const rows = candidates.map(candidate => {
    const votes = voteMap[candidate.name] || 0;
    const percent = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;
    return `
      <div class="chart-row">
        <div class="chart-label-row">
          <span>${candidate.name}</span>
          <strong>${votes}</strong>
        </div>
        <div class="bar-track"><div class="bar-fill" style="width:${Math.max(percent, 8)}%"></div></div>
      </div>
    `;
  }).join('');

  if (candidateBreakdownEl) {
    candidateBreakdownEl.innerHTML = rows || '<div class="empty-note">No candidates yet.</div>';
  }
}

function renderActivities(events) {
  if (!liveActivityEl) return;
  liveActivityEl.innerHTML = events.length ? events.map(item => `
    <div class="activity-item">
      <span class="dot"></span>
      <div>
        <strong>${item.title}</strong>
        <small>${item.meta}</small>
      </div>
    </div>
  `).join('') : '<div class="empty-note">No recent activity.</div>';
}

function renderCandidatesList(candidates, voteMap) {
  if (!candidateListEl) return;
  candidateListEl.innerHTML = candidates.length ? candidates.map(candidate => `
    <div class="candidate-row">
      <div>
        <strong>${candidate.name}</strong>
        <small>${candidate.party}</small>
      </div>
      <span>${voteMap[candidate.name] || 0} votes</span>
    </div>
  `).join('') : '<div class="empty-note">No candidates have been added yet.</div>';
}

function renderUsers(users) {
  if (!userListEl) return;
  userListEl.innerHTML = users.length ? users.map(user => `
    <div class="user-row">
      <div class="avatar-mini">${(user.displayName || user.email || 'U').split(' ').map(part => part[0]).slice(0,2).join('').toUpperCase()}</div>
      <div>
        <strong>${user.displayName || 'Unnamed voter'}</strong>
        <small>${user.email}</small>
      </div>
    </div>
  `).join('') : '<div class="empty-note">No users yet.</div>';
}

function populateAdminDashboard(candidates, users, votes, events) {
  const voteMap = {};
  votes.forEach(vote => {
    const candidateNameValue = vote.candidate || 'Unknown';
    voteMap[candidateNameValue] = (voteMap[candidateNameValue] || 0) + 1;
  });

  const totalVotes = votes.length;
  if (totalVotesEl) totalVotesEl.textContent = String(totalVotes);
  if (totalUsersEl) totalUsersEl.textContent = String(users.length);
  if (totalCandidatesEl) totalCandidatesEl.textContent = String(candidates.length);

  const winner = candidates.reduce((bestCandidate, currentCandidate) => {
    const currentVotes = voteMap[currentCandidate.name] || 0;
    const bestVotes = bestCandidate ? voteMap[bestCandidate.name] || 0 : 0;
    if (!bestCandidate || currentVotes > bestVotes) {
      return currentCandidate;
    }
    return bestCandidate;
  }, null);

  if (winnerNameEl) winnerNameEl.textContent = winner ? winner.name : '—';

  renderBreakdown(candidates, voteMap);
  renderCandidatesList(candidates, voteMap);
  renderUsers(users);
  renderActivities(events.slice(0, 8));
}

if (addCandidateForm) {
  addCandidateForm.addEventListener('submit', async event => {
    event.preventDefault();
    const name = candidateName.value.trim();
    const party = candidateParty.value.trim();

    if (!name || !party) return;

    await db.collection('candidates').add({
      name,
      party,
      order: Date.now()
    });

    candidateName.value = '';
    candidateParty.value = '';
  });
}

if (signOutAdminBtn) {
  signOutAdminBtn.addEventListener('click', async () => {
    await auth.signOut();
    window.location.href = 'index.html';
  });
}

auth.onAuthStateChanged(async user => {
  if (!user) {
    window.location.href = 'index.html';
    return;
  }

  // allow admin by email OR by `isAdmin` flag on the user document
  let isAdmin = false;
  try {
    const userDoc = await db.collection('users').doc(user.uid).get();
    const userData = userDoc.exists ? userDoc.data() : null;
    isAdmin = (!!user.email && user.email.toLowerCase() === adminEmail.toLowerCase()) || (userData && userData.isAdmin === true);
  } catch (err) {
    console.error('Admin check failed', err);
    isAdmin = !!user.email && user.email.toLowerCase() === adminEmail.toLowerCase();
  }

  if (!isAdmin) {
    window.location.href = 'index.html';
    return;
  }

  db.collection('candidates').orderBy('order').onSnapshot(snapshot => {
    const candidates = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    db.collection('users').onSnapshot(usersSnapshot => {
      const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      db.collection('votes').orderBy('timestamp', 'desc').onSnapshot(votesSnapshot => {
        const votes = votesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        db.collection('events').orderBy('time', 'desc').limit(20).onSnapshot(eventsSnapshot => {
          const events = eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          const formattedEvents = events.map(event => ({
            title: event.type === 'vote_submitted' ? `${event.email || event.uid || 'A voter'} voted for ${event.candidate}` : `${event.type}`,
            meta: event.time && event.time.toDate ? new Date(event.time.toDate()).toLocaleString() : 'Recent event'
          }));
          populateAdminDashboard(candidates, users, votes, formattedEvents);
        });
      });
    });
  });
});
