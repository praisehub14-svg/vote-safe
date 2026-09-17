const candidateCards = document.querySelectorAll('.candidate-card');
const reviewButton = document.getElementById('reviewVote');
const reviewModal = document.getElementById('reviewModal');
const closeModal = document.getElementById('closeModal');
const editVote = document.getElementById('editVote');
const submitVote = document.getElementById('submitVote');
const selectedCandidateText = document.getElementById('selectedCandidate');
const toast = document.getElementById('toast');
const themeToggle = document.getElementById('themeToggle');
const authOverlay = document.getElementById('authOverlay');
// Sign-in form elements
const signInEmail = document.getElementById('signInEmail');
const signInPassword = document.getElementById('signInPassword');
const signInBtn = document.getElementById('signInBtn');
// Sign-up form elements
const signUpDisplayName = document.getElementById('signUpDisplayName');
const signUpEmail = document.getElementById('signUpEmail');
const signUpPassword = document.getElementById('signUpPassword');
const signUpBtn = document.getElementById('signUpBtn');
// UI toggles
const showSignIn = document.getElementById('showSignIn');
const showSignUp = document.getElementById('showSignUp');
const signOutBtn = document.getElementById('signOutBtn');
const authNotice = document.getElementById('authNotice');
const adminPanel = document.getElementById('adminPanel');
const adminVotes = document.getElementById('adminVotes');
const adminAnnouncements = document.getElementById('adminAnnouncements');
const announcementText = document.getElementById('announcementText');
const announceBtn = document.getElementById('announceBtn');
const adminBtn = document.getElementById('adminBtn');
const headerUser = document.getElementById('headerUser');
const headerAvatar = document.getElementById('headerAvatar');
const profileBtn = document.getElementById('profileBtn');
const profileModal = document.getElementById('profileModal');
const closeProfile = document.getElementById('closeProfile');
const closeProfileFooter = document.getElementById('closeProfileFooter');
const profileAvatar = document.getElementById('profileAvatar');
const profileNameEl = document.getElementById('profileName');
const profileEmail = document.getElementById('profileEmail');
const profileDisplayName = document.getElementById('profileDisplayName');
const avatarColor = document.getElementById('avatarColor');
const saveProfile = document.getElementById('saveProfile');

let selectedCandidate = '';
const adminEmail = 'praisehub14@gmail.com';

// Firebase configuration (provided)
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
const functions = firebase.functions();

function openModal() {
  selectedCandidateText.textContent = selectedCandidate;
  reviewModal.classList.add('open');
  reviewModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  closeModal.focus();
}

function hideModal() {
  reviewModal.classList.remove('open');
  reviewModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

candidateCards.forEach((card) => {
  card.addEventListener('click', () => {
    candidateCards.forEach((item) => {
      item.classList.remove('selected');
      item.setAttribute('aria-pressed', 'false');
    });
    card.classList.add('selected');
    card.setAttribute('aria-pressed', 'true');
    selectedCandidate = card.dataset.candidate;
    reviewButton.disabled = false;
    reviewButton.removeAttribute('disabled');
  });
});

reviewButton.addEventListener('click', () => {
  if (selectedCandidate) openModal();
});
closeModal.addEventListener('click', hideModal);
editVote.addEventListener('click', hideModal);
reviewModal.addEventListener('click', (event) => {
  if (event.target === reviewModal) hideModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && reviewModal.classList.contains('open')) hideModal();
});

async function submitVoteToFirestore() {
  const user = auth.currentUser;
  if (!user) {
    authNotice.textContent = 'You must sign in before submitting a vote.';
    authOverlay.hidden = false;
    return;
  }

  // Use callable Cloud Function to atomically enforce single vote
  try {
    const submit = functions.httpsCallable('submitVote');
    await submit({ candidate: selectedCandidate });
  } catch (err) {
    const msg = err?.message || 'Error submitting vote';
    console.error('submitVote callable error', err);
    toast.querySelector('small').textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 5000);
    return;
  }

  hideModal();
  toast.classList.add('show');
  document.querySelector('.ballot-panel').classList.add('submitted');
  setTimeout(() => toast.classList.remove('show'), 5000);
}

submitVote.addEventListener('click', async () => {
  submitVote.disabled = true;
  submitVote.innerHTML = 'Encrypting… <span>⟳</span>';
  setTimeout(async () => {
    try {
      await submitVoteToFirestore();
    } catch (err) {
      console.error(err);
      authNotice.textContent = 'There was an error submitting your vote.';
    } finally {
      submitVote.disabled = false;
      submitVote.innerHTML = 'Encrypt & submit <span>→</span>';
    }
  }, 1100);
});

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀' : '◐';
  themeToggle.setAttribute('aria-label', document.body.classList.contains('dark') ? 'Switch to light mode' : 'Toggle dark mode');
});

// Navigation active state
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach((section) => observer.observe(section));

// Demo-only countdown display.
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

// Authentication flows
showSignIn?.addEventListener('click', () => {
  document.getElementById('signInForm').hidden = false;
  document.getElementById('signUpForm').hidden = true;
});
showSignUp?.addEventListener('click', () => {
  document.getElementById('signInForm').hidden = true;
  document.getElementById('signUpForm').hidden = false;
});

signInBtn.addEventListener('click', async () => {
  try {
    await auth.signInWithEmailAndPassword(signInEmail.value, signInPassword.value);
  } catch (err) {
    authNotice.textContent = err.message;
  }
});

signUpBtn.addEventListener('click', async () => {
  try {
    const displayNameVal = signUpDisplayName?.value || '';
    const cred = await auth.createUserWithEmailAndPassword(signUpEmail.value, signUpPassword.value);
    // create user profile doc with avatar
    const color = colorFromString(cred.user.uid || cred.user.email || '');
    const initials = initialsFromName(displayNameVal || cred.user.email || '');
    const avatar = generateAvatarDataUrl(initials, color);
    await db.collection('users').doc(cred.user.uid).set({ email: cred.user.email, displayName: displayNameVal, avatarColor: color, avatar, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
    // show success, auto-close form and notify
    authNotice.textContent = 'Account created — signing in...';
    // add small animation and close
    const card = document.querySelector('.auth-card');
    if (card) card.classList.add('fade-out');
    setTimeout(() => {
      authOverlay.hidden = true;
      if (card) card.classList.remove('fade-out');
      // show toast
      const toastTitle = toast.querySelector('strong');
      const toastSmall = toast.querySelector('small');
      if (toastTitle) toastTitle.textContent = 'Account created';
      if (toastSmall) toastSmall.textContent = 'You are signed in and ready.';
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3000);
    }, 650);
  } catch (err) {
    authNotice.textContent = err.message;
  }
});

signOutBtn.addEventListener('click', async () => {
  await auth.signOut();
});

announceBtn.addEventListener('click', async () => {
  const user = auth.currentUser;
  if (!user || user.email !== adminEmail) return;
  const text = announcementText.value.trim();
  if (!text) return;
  await db.collection('announcements').add({ text, author: user.email, timestamp: firebase.firestore.FieldValue.serverTimestamp() });
  announcementText.value = '';
});

// Real-time admin listeners
function attachAdminListeners() {
  if (!adminPanel) return;
  db.collection('votes').orderBy('timestamp', 'desc').onSnapshot((snap) => {
    adminVotes.innerHTML = '';
    snap.forEach((doc) => {
      const d = doc.data();
      const when = d.timestamp && d.timestamp.toDate ? d.timestamp.toDate().toLocaleString() : '';
      const el = document.createElement('div');
      el.className = 'admin-log-item';
      el.textContent = `${when} — ${d.email || d.uid} → ${d.candidate}`;
      adminVotes.appendChild(el);
    });
  });

  db.collection('announcements').orderBy('timestamp', 'desc').onSnapshot((snap) => {
    adminAnnouncements.innerHTML = '';
    snap.forEach((doc) => {
      const d = doc.data();
      const when = d.timestamp && d.timestamp.toDate ? d.timestamp.toDate().toLocaleString() : '';
      const el = document.createElement('div');
      el.className = 'admin-log-item';
      el.textContent = `${when} — ${d.author}: ${d.text}`;
      adminAnnouncements.appendChild(el);
    });
  });
}

// Auth state handling: gate site and switch to admin view
auth.onAuthStateChanged(async (user) => {
  if (!user) {
    // show auth overlay and hide main site
    authOverlay.hidden = false;
    adminPanel.hidden = true;
    document.querySelector('main').hidden = true;
    signOutBtn.hidden = true;
    return;
  }

  authOverlay.hidden = true;
  document.querySelector('main').hidden = false;
  signOutBtn.hidden = false;

  if (user.email === adminEmail) {
    adminPanel.hidden = false;
    attachAdminListeners();
    if (adminBtn) adminBtn.hidden = false;
  } else {
    adminPanel.hidden = true;
    if (adminBtn) adminBtn.hidden = true;
  }
  // Load or create user profile
  try {
    const ref = db.collection('users').doc(user.uid);
    const doc = await ref.get();
    let profile;
    if (!doc.exists) {
      // create profile with generated avatar
      const displayName = document.getElementById('signUpDisplayName')?.value || (user.displayName || '');
      const color = colorFromString(user.uid || user.email || '');
      const initials = initialsFromName(displayName || user.email || '');
      const avatar = generateAvatarDataUrl(initials, color);
      profile = { email: user.email, displayName: displayName || '', avatarColor: color, avatar, createdAt: firebase.firestore.FieldValue.serverTimestamp() };
      await ref.set(profile);
    } else {
      profile = doc.data();
      if (!profile.avatar) {
        const color = profile.avatarColor || colorFromString(user.uid || user.email || '');
        const initials = initialsFromName(profile.displayName || user.email || '');
        profile.avatar = generateAvatarDataUrl(initials, color);
      }
    }
    // Update header and profile UI
    headerUser.hidden = false;
    headerAvatar.src = profile.avatar;
    profileAvatar.src = profile.avatar;
    profileNameEl.textContent = profile.displayName || user.email;
    profileEmail.textContent = user.email;
    profileDisplayName.value = profile.displayName || '';
    avatarColor.value = profile.avatarColor || colorFromString(user.uid || user.email || '');
  } catch (err) {
    console.error('Profile load error', err);
  }
});

// Avatar / profile helpers
function initialsFromName(name) {
  if (!name) return '';
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] || '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}

function colorFromString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
  const hue = Math.abs(h) % 360;
  return `hsl(${hue} 70% 45%)`;
}

function generateAvatarDataUrl(initials, bg) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='128' height='128'><rect width='100%' height='100%' fill='${bg}' rx='20'/><text x='50%' y='55%' font-size='52' text-anchor='middle' fill='white' font-family='Inter,Arial,sans-serif' font-weight='700'>${initials}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

profileBtn?.addEventListener('click', () => {
  profileModal.hidden = false;
  profileModal.setAttribute('aria-hidden', 'false');
});
closeProfile?.addEventListener('click', () => {
  profileModal.hidden = true;
  profileModal.setAttribute('aria-hidden', 'true');
});
closeProfileFooter?.addEventListener('click', () => {
  profileModal.hidden = true;
  profileModal.setAttribute('aria-hidden', 'true');
});

saveProfile?.addEventListener('click', async () => {
  const user = auth.currentUser;
  if (!user) return;
  const name = profileDisplayName.value.trim();
  const color = avatarColor.value || colorFromString(user.uid || user.email || '');
  const initials = initialsFromName(name || user.email || '');
  const avatar = generateAvatarDataUrl(initials, color);
  try {
    await db.collection('users').doc(user.uid).update({ displayName: name, avatarColor: color, avatar });
    headerAvatar.src = avatar;
    profileAvatar.src = avatar;
    profileNameEl.textContent = name || user.email;
    profileModal.hidden = true;
  } catch (err) {
    console.error('Profile save error', err);
  }
});

// Important project note: this is a front-end demonstration only.
// Real election security requires a trusted backend, audited cryptography,
// key management, authentication, audit logs, and independent security testing.
