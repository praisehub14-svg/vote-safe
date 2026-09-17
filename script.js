const candidateGrid = document.getElementById('candidateGrid');
const reviewButton = document.getElementById('reviewVote');
const reviewModal = document.getElementById('reviewModal');
const closeModal = document.getElementById('closeModal');
const editVote = document.getElementById('editVote');
const submitVote = document.getElementById('submitVote');
const selectedCandidateText = document.getElementById('selectedCandidate');
const toast = document.getElementById('toast');
const themeToggle = document.getElementById('themeToggle');
const authOverlay = document.getElementById('authOverlay');
const authNotice = document.getElementById('authNotice');
const signInEmail = document.getElementById('signInEmail');
const signInPassword = document.getElementById('signInPassword');
const signInBtn = document.getElementById('signInBtn');
const signUpDisplayName = document.getElementById('signUpDisplayName');
const signUpEmail = document.getElementById('signUpEmail');
const signUpPassword = document.getElementById('signUpPassword');
const signUpConfirmPassword = document.getElementById('signUpConfirmPassword');
const signUpBtn = document.getElementById('signUpBtn');
const showSignIn = document.getElementById('showSignIn');
const showSignUp = document.getElementById('showSignUp');
const signOutBtn = document.getElementById('signOutBtn');
const adminBtn = document.getElementById('adminBtn');
const headerUser = document.getElementById('headerUser');
const headerAvatar = document.getElementById('headerAvatar');
const profileBtn = document.getElementById('profileBtn');
const profileModal = document.getElementById('profileModal');
const saveProfile = document.getElementById('saveProfile');
const appLoader = document.getElementById('appLoader');
const appMain = document.getElementById('appMain');

let selectedCandidate = '';
let candidateList = [];
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
const functions = firebase.functions();

function setLoadingScreen(isVisible) {
  if (!appLoader) return;
  appLoader.hidden = !isVisible;
  if (isVisible) {
    document.body.classList.add('is-loading');
  } else {
    document.body.classList.remove('is-loading');
  }
}

function showAuthOverlay() {
  if (!authOverlay) return;
  authOverlay.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeAuthOverlay() {
  if (!authOverlay) return;
  authOverlay.hidden = true;
  document.body.style.overflow = '';
}

function showToast(title, small, ms = 3000) {
  const strong = toast.querySelector('strong');
  const detail = toast.querySelector('small');
  if (strong) strong.textContent = title;
  if (detail) detail.textContent = small;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), ms);
}

function setButtonLoading(btn, loading, text) {
  if (!btn) return;
  if (loading) {
    btn.dataset.originalHTML = btn.innerHTML;
    btn.classList.add('loading');
    btn.disabled = true;
    btn.innerHTML = text || btn.textContent;
  } else {
    btn.classList.remove('loading');
    btn.disabled = false;
    if (btn.dataset.originalHTML) {
      btn.innerHTML = btn.dataset.originalHTML;
      delete btn.dataset.originalHTML;
    }
  }
}

function renderCandidates(candidates) {
  candidateList = candidates;
  candidateGrid.innerHTML = '';

  if (!candidates.length) {
    candidateGrid.innerHTML = '<div class="empty-note">No candidates are available yet.</div>';
    return;
  }

  candidates.forEach((candidate, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'candidate-card';
    button.dataset.candidate = candidate.name;
    button.dataset.id = candidate.id || candidate.name;
    button.innerHTML = `
      <div class="candidate-avatar">${(candidate.name || 'VS').split(' ').map(part => part[0]).slice(0,2).join('').toUpperCase()}</div>
      <span class="candidate-details">
        <strong>${candidate.name}</strong>
        <small>${candidate.party || 'Independent candidate'}</small>
      </span>
      <span class="candidate-meta">${candidate.votes || 0} votes</span>
      <span class="candidate-radio"></span>
    `;

    button.addEventListener('click', () => {
      const activeCards = document.querySelectorAll('.candidate-card');
      activeCards.forEach(item => item.classList.remove('selected'));
      button.classList.add('selected');
      selectedCandidate = candidate.name;
      reviewButton.disabled = false;
    });

    if (index === 0 && !selectedCandidate) {
      button.classList.add('selected');
      selectedCandidate = candidate.name;
      reviewButton.disabled = false;
    }

    candidateGrid.appendChild(button);
  });
}

async function ensureSeedCandidates() {
  const snapshot = await db.collection('candidates').orderBy('order').get();
  if (!snapshot.empty) {
    const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    renderCandidates(list);
    return;
  }

  const defaults = [
    { name: 'Amina Okafor', party: 'Community First', order: 1 },
    { name: 'Daniel Brooks', party: 'Future Forward', order: 2 },
    { name: 'Ike Praise', party: "People's Choice", order: 3 }
  ];

  await Promise.all(defaults.map(item => db.collection('candidates').add(item)));
  const refreshed = await db.collection('candidates').orderBy('order').get();
  renderCandidates(refreshed.docs.map(doc => ({ id: doc.id, ...doc.data() })));
}

async function loadCandidateStats() {
  const votesSnapshot = await db.collection('votes').get();
  const voteCounts = {};
  votesSnapshot.forEach(doc => {
    const data = doc.data();
    const candidate = data.candidate || data.name;
    voteCounts[candidate] = (voteCounts[candidate] || 0) + 1;
  });

  const candidateSnapshot = await db.collection('candidates').orderBy('order').get();
  const candidates = candidateSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    votes: voteCounts[doc.data().name] || 0
  }));

  renderCandidates(candidates);
}

function openModal() {
  if (!selectedCandidate) return;
  selectedCandidateText.textContent = selectedCandidate;
  reviewModal.classList.add('open');
  reviewModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function hideModal() {
  reviewModal.classList.remove('open');
  reviewModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

reviewButton.addEventListener('click', () => {
  if (selectedCandidate) openModal();
});
closeModal.addEventListener('click', hideModal);
editVote.addEventListener('click', hideModal);
reviewModal.addEventListener('click', event => {
  if (event.target === reviewModal) hideModal();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && reviewModal.classList.contains('open')) hideModal();
});

async function submitVoteToFirestore() {
  const user = auth.currentUser;
  if (!user) {
    authNotice.textContent = 'You must sign in before submitting a vote.';
    showAuthOverlay();
    return;
  }

  try {
    const submitVoteData = functions.httpsCallable('submitVote');
    await submitVoteData({ candidate: selectedCandidate });
    hideModal();
    showToast('Vote submitted securely', 'Your ballot has been recorded.', 3500);
    document.querySelector('.ballot-panel').classList.add('submitted');
    await loadCandidateStats();
  } catch (err) {
    const message = err && err.message ? err.message : 'Vote could not be submitted';
    showToast('Submission failed', message, 4000);
    throw err;
  }
}

submitVote.addEventListener('click', async () => {
  submitVote.disabled = true;
  submitVote.innerHTML = 'Encrypting… <span>⟳</span>';
  try {
    await submitVoteToFirestore();
  } catch (err) {
    console.error('submitVote error', err);
  } finally {
    submitVote.disabled = false;
    submitVote.innerHTML = 'Encrypt & submit <span>→</span>';
  }
});

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀' : '◐';
  themeToggle.setAttribute('aria-label', document.body.classList.contains('dark') ? 'Switch to light mode' : 'Toggle dark mode');
});

const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach(section => observer.observe(section));

let secondsLeft = 2 * 60 * 60 + 14 * 60 + 36;
setInterval(() => {
  if (secondsLeft <= 0) return;
  secondsLeft -= 1;
  const hours = String(Math.floor(secondsLeft / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, '0');
  const seconds = String(secondsLeft % 60).padStart(2, '0');
  const countdown = document.querySelector('.live-card small');
  if (countdown) countdown.textContent = `Closes in ${hours}:${minutes}:${seconds}`;
}, 1000);

showSignIn.addEventListener('click', () => {
  const card = document.querySelector('.auth-card');
  card.classList.remove('show-signup');
  showSignIn.classList.add('active');
  showSignUp.classList.remove('active');
});

showSignUp.addEventListener('click', () => {
  const card = document.querySelector('.auth-card');
  card.classList.add('show-signup');
  showSignUp.classList.add('active');
  showSignIn.classList.remove('active');
});

document.querySelectorAll('.password-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const input = button.parentElement.querySelector('input');
    if (!input) return;
    const nextType = input.type === 'password' ? 'text' : 'password';
    input.type = nextType;
    button.textContent = nextType === 'password' ? '👁' : '🙈';
  });
});

function getInitials(name) {
  if (!name) return 'VS';
  const parts = name.trim().split(/\s+/);
  const initials = parts.slice(0, 2).map(part => part[0]).join('').toUpperCase();
  return initials || 'VS';
}

function colorFromString(value) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  return `hsl(${hue} 72% 52%)`;
}

function generateAvatarDataUrl(initials, bg) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='128' height='128'><rect width='100%' height='100%' fill='${bg}' rx='20'/><text x='50%' y='55%' font-size='52' text-anchor='middle' fill='white' font-family='Inter,Arial,sans-serif' font-weight='700'>${initials}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

async function ensureUserProfile(user) {
  const ref = db.collection('users').doc(user.uid);
  const doc = await ref.get();
  if (!doc.exists) {
    const profile = {
      email: user.email,
      displayName: user.displayName || '',
      avatarColor: colorFromString(user.uid || user.email || 'user'),
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    profile.avatar = generateAvatarDataUrl(getInitials(profile.displayName || user.email), profile.avatarColor);
    await ref.set(profile);
    return profile;
  }

  const data = doc.data();
  if (!data.avatar) {
    const color = data.avatarColor || colorFromString(user.uid || user.email || 'user');
    const avatar = generateAvatarDataUrl(getInitials(data.displayName || user.email), color);
    await ref.update({ avatarColor: color, avatar });
    return { ...data, avatar, avatarColor: color };
  }

  return data;
}

async function updateHeader(user) {
  const profile = await ensureUserProfile(user);
  if (!profile) return;
  headerUser.hidden = false;
  headerAvatar.src = profile.avatar || generateAvatarDataUrl(getInitials(profile.displayName || user.email), profile.avatarColor || '#159b63');
  headerAvatar.hidden = false;
}

signInBtn.addEventListener('click', async () => {
  setButtonLoading(signInBtn, true, 'Signing in…');
  try {
    await auth.signInWithEmailAndPassword(signInEmail.value.trim(), signInPassword.value);
    authNotice.textContent = 'Signed in successfully';
    showToast('Signed in', 'Welcome back.', 2000);
    closeAuthOverlay();
  } catch (error) {
    authNotice.textContent = error.message;
    showToast('Sign in failed', error.message, 4000);
  } finally {
    setButtonLoading(signInBtn, false);
  }
});

signUpBtn.addEventListener('click', async () => {
  setButtonLoading(signUpBtn, true, 'Creating account…');
  try {
    const displayName = signUpDisplayName.value.trim();
    const email = signUpEmail.value.trim();
    const password = signUpPassword.value;
    const confirm = signUpConfirmPassword.value;

    if (password !== confirm) {
      throw new Error('Passwords do not match.');
    }

    const cred = await auth.createUserWithEmailAndPassword(email, password);
    const profileColor = colorFromString(cred.user.uid || email);
    const avatar = generateAvatarDataUrl(getInitials(displayName || email), profileColor);

    await db.collection('users').doc(cred.user.uid).set({
      email,
      displayName,
      avatarColor: profileColor,
      avatar,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    if (auth.currentUser) {
      await auth.currentUser.updateProfile({ displayName });
    }

    authNotice.textContent = 'Account created successfully';
    showToast('Account created', 'Welcome — signing in.', 3000);
  } catch (error) {
    authNotice.textContent = error.message;
    showToast('Account creation failed', error.message, 4000);
  } finally {
    setButtonLoading(signUpBtn, false);
  }
});

signOutBtn.addEventListener('click', async () => {
  await auth.signOut();
});

auth.onAuthStateChanged(async user => {
  if (!user) {
    showAuthOverlay();
    headerUser.hidden = true;
    adminBtn.hidden = true;
    appMain.classList.add('locked');
    return;
  }

  closeAuthOverlay();
  appMain.classList.remove('locked');
  await updateHeader(user);

  if (user.email === adminEmail) {
    adminBtn.hidden = false;
  } else {
    adminBtn.hidden = true;
  }

  signOutBtn.hidden = false;
});

setLoadingScreen(true);
window.addEventListener('load', () => {
  ensureSeedCandidates()
    .then(() => loadCandidateStats())
    .catch(error => console.error('Candidate load failed', error));

  setTimeout(() => {
    setLoadingScreen(false);
  }, 1200);
});
