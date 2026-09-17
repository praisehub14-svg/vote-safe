// Admin dashboard logic
const firebaseConfig = {
  apiKey: "AIzaSyCRoR8aw1qxlsJgzKuH2O_h9fLqb8KcovU",
  authDomain: "votesafe-47903.firebaseapp.com",
  databaseURL: "https://votesafe-47903-default-rtdb.firebaseio.com",
  projectId: "votesafe-47903",
  storageBucket: "votesafe-47903.firebasestorage.app",
  messagingSenderId: "467625260000",
  appId: "1:467625260000:web:caaa263b3f8cf183b0f185",
  measurementId: "G-BMBXCXRMJ0"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const adminEmail = 'praisehub14@gmail.com';

const totalVotesEl = document.getElementById('totalVotes');
const liveActivity = document.getElementById('liveActivity');
const chart = document.getElementById('chart');
const announceList = document.getElementById('announceList');
const announceText = document.getElementById('announceText');
const publishAnnounce = document.getElementById('publishAnnounce');
const declareWinner = document.getElementById('declareWinner');
const signOutAdmin = document.getElementById('signOutAdmin');

let candidateCounts = {};
let chartInstance = null;

function renderChart() {
  // Render with Chart.js for a professional look
  const labels = Object.keys(candidateCounts);
  const data = Object.values(candidateCounts);
  if (!chartInstance) {
    const ctx = document.createElement('canvas');
    chart.appendChild(ctx);
    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{ label: 'Votes', data, backgroundColor: ['#29c77d', '#087348', '#6ad79a', '#3bbf7e'] }]
      },
      options: { responsive: true, plugins: { legend: { display: false } }, scales: { x: { ticks: { color: '#0b2b20' } }, y: { beginAtZero: true } } }
    });
  } else {
    chartInstance.data.labels = labels;
    chartInstance.data.datasets[0].data = data;
    chartInstance.update();
  }
}

function addActivity(text) {
  const el = document.createElement('div'); el.className='activity-item'; el.textContent = text;
  liveActivity.prepend(el);
  while (liveActivity.children.length > 50) liveActivity.removeChild(liveActivity.lastChild);
}

// Security: ensure the signed-in user is the admin
auth.onAuthStateChanged(user => {
  if (!user) {
    location.href = '/';
    return;
  }
  if (user.email !== adminEmail) {
    alert('Access denied: admin only');
    auth.signOut();
    return;
  }

  // attach listeners
  db.collection('votes').onSnapshot(snap => {
    candidateCounts = {};
    snap.forEach(doc => {
      const d = doc.data();
      candidateCounts[d.candidate] = (candidateCounts[d.candidate] || 0) + 1;
    });
    const total = Object.values(candidateCounts).reduce((a,b)=>a+b,0);
    totalVotesEl.textContent = total;
    renderChart();
  });

  db.collection('events').orderBy('time','desc').limit(50).onSnapshot(snap => {
    snap.forEach(doc => {
      const d = doc.data();
      if (d.type === 'vote_submitted') addActivity(`${d.uid} voted for ${d.candidate}`);
    });
  });

  db.collection('announcements').orderBy('timestamp','desc').onSnapshot(snap => {
    announceList.innerHTML = '';
    snap.forEach(doc => {
      const d = doc.data();
      const el = document.createElement('div'); el.className='announce-item'; el.textContent = `${d.author}: ${d.text}`;
      announceList.appendChild(el);
    });
  });
});

publishAnnounce.addEventListener('click', async () => {
  const user = auth.currentUser;
  if (!user || user.email !== adminEmail) return;
  const text = announceText.value.trim();
  if (!text) return;
  await db.collection('announcements').add({ text, author: user.email, timestamp: firebase.firestore.FieldValue.serverTimestamp() });
  announceText.value = '';
});

declareWinner.addEventListener('click', async () => {
  const entries = Object.entries(candidateCounts).sort((a,b)=>b[1]-a[1]);
  if (!entries.length) return alert('No votes yet');
  const winner = entries[0][0];
  const user = auth.currentUser;
  await db.collection('announcements').add({ text: `Winner: ${winner}`, author: user.email, timestamp: firebase.firestore.FieldValue.serverTimestamp() });
});

signOutAdmin.addEventListener('click', async()=>{ await auth.signOut(); location.href='/' });
