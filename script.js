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
const adminBtnMobile = document.getElementById('adminBtnMobile');
const headerUser = document.getElementById('headerUser');
const headerAvatar = document.getElementById('headerAvatar');
const profileBtn = document.getElementById('profileBtn');
const profileModal = document.getElementById('profileModal');
const closeProfile = document.getElementById('closeProfile');
const closeProfileFooter = document.getElementById('closeProfileFooter');
const profileAvatar = document.getElementById('profileAvatar');
const profileEmail = document.getElementById('profileEmail');
const profileDisplayName = document.getElementById('profileDisplayName');
const profileTitle = document.getElementById('profileTitle');
const saveProfile = document.getElementById('saveProfile');
const logoutBtn = document.getElementById('logoutBtn');
const appLoader = document.getElementById('appLoader');
const appMain = document.getElementById('appMain');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileNavPanel = document.getElementById('mobileNavPanel');

let selectedCandidate = '';
let currentUserIsAdmin = false;
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
const functions = typeof firebase.functions === 'function' ? firebase.functions() : null;

function escapeHtml(value) {
  return String(value || '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
}

function setLoadingScreen(isVisible) {
  if (!appLoader) return;
  appLoader.hidden = !isVisible;
  document.body.classList.toggle('is-loading', isVisible);
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
  if (!toast) return;
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

function generateProAvatarDataUrl(name, email, colorHint) {
  const safeName = (name && name.trim()) || (email && email.trim()) || 'VoteSafe';
  const hash = [...safeName].reduce((total, char) => total + char.charCodeAt(0), 0);
  const hueA = Math.abs(hash) % 360;
  const hueB = (hueA + 44) % 360;
  const hueC = (hueA + 120) % 360;
  const base = `hsl(${hueA} 72% 52%)`;
  const accent = `hsl(${hueB} 64% 58%)`;
  const shadow = `hsl(${hueC} 54% 42%)`;
  const initials = safeName.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0].toUpperCase()).join('') || 'VS';
  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='240' height='240' viewBox='0 0 240 240'>
      <defs>
        <linearGradient id='bgGradient' x1='0' x2='1' y1='0' y2='1'>
          <stop offset='0%' stop-color='${base}' />
          <stop offset='52%' stop-color='${accent}' />
          <stop offset='100%' stop-color='${shadow}' />
        </linearGradient>
      </defs>
      <rect width='240' height='240' rx='52' fill='url(#bgGradient)' />
      <circle cx='170' cy='60' r='52' fill='rgba(255,255,255,0.16)' />
      <circle cx='70' cy='165' r='60' fill='rgba(8,30,20,0.12)' />
      <path d='M70 70c18-30 82-30 100 0v78c-11 28-88 28-100 0V70Z' fill='rgba(255,255,255,0.18)' />
      <circle cx='121' cy='92' r='28' fill='rgba(255,255,255,0.88)' />
      <path d='M83 158c10-22 30-33 41-33s31 11 41 33v18H83v-18Z' fill='rgba(255,255,255,0.82)' />
      <text x='120' y='206' text-anchor='middle' fill='white' font-size='28' font-family='Inter, Arial, sans-serif' font-weight='800'>${initials}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function getInitials(name = '') {
  if (!name) return 'VS';
  const parts = name.trim().split(/\s+/).filter(Boolean);
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

function renderCandidates(candidates) {
  if (!candidateGrid) return;
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

    const candidateAvatar = candidate.imageUrl || candidate.avatar || generateProAvatarDataUrl(candidate.name, candidate.party || 'Candidate', candidate.color || '#159b63');
    const voteMeta = currentUserIsAdmin ? `<span class="candidate-meta">${candidate.votes || 0} votes</span>` : '<span class="candidate-meta is-private">Private</span>';

    button.innerHTML = `
      <img class="candidate-avatar" src="${escapeHtml(candidateAvatar)}" alt="${escapeHtml(candidate.name)}" />
      <span class="candidate-details">
        <strong>${escapeHtml(candidate.name)}</strong>
        <small>${escapeHtml(candidate.party || 'Independent candidate')}</small>
      </span>
      ${voteMeta}
      <span class="candidate-radio"></span>
    `;

    button.addEventListener('click', () => {
      document.querySelectorAll('.candidate-card').forEach(item => item.classList.remove('selected'));
      button.classList.add('selected');
      selectedCandidate = candidate.name;
      if (reviewButton) reviewButton.disabled = false;
    });

    if (index === 0 && !selectedCandidate) {
      button.classList.add('selected');
      selectedCandidate = candidate.name;
      if (reviewButton) reviewButton.disabled = false;
    }

    candidateGrid.appendChild(button);
  });
}

async function ensureSeedCandidates() {
  if (!auth.currentUser) return;

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
  if (!auth.currentUser) return;

  const candidateSnapshot = await db.collection('candidates').orderBy('order').get();

  if (!currentUserIsAdmin) {
    renderCandidates(candidateSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), votes: 0 })));
    return;
  }

  const votesSnapshot = await db.collection('votes').get();
  const voteCounts = {};
  votesSnapshot.forEach(doc => {
    const data = doc.data();
    const candidate = data.candidate || data.name;
    voteCounts[candidate] = (voteCounts[candidate] || 0) + 1;
  });

  const candidates = candidateSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    votes: voteCounts[doc.data().name] || 0
  }));

  renderCandidates(candidates);
}

// keep candidate list in sync for signed-in users
let candidatesUnsub = null;

function openModal() {
  if (!selectedCandidate || !reviewModal) return;
  selectedCandidateText.textContent = selectedCandidate;
  reviewModal.classList.add('open');
  reviewModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function hideModal() {
  if (!reviewModal) return;
  reviewModal.classList.remove('open');
  reviewModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

if (reviewButton) {
  reviewButton.addEventListener('click', () => {
    if (selectedCandidate) openModal();
  });
}
if (closeModal) closeModal.addEventListener('click', hideModal);
if (editVote) editVote.addEventListener('click', hideModal);
if (reviewModal) {
  reviewModal.addEventListener('click', event => {
    if (event.target === reviewModal) hideModal();
  });
}
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && reviewModal && reviewModal.classList.contains('open')) hideModal();
});

async function submitVoteToFirestore() {
  const user = auth.currentUser;
  if (!user) {
    authNotice.textContent = 'You must sign in before submitting a vote.';
    showAuthOverlay();
    return;
  }

  try {
    const voteRef = db.collection('votes').doc(user.uid);

    await db.runTransaction(async (tx) => {
      const voteDoc = await tx.get(voteRef);
      if (voteDoc.exists) {
        throw new Error('User has already voted');
      }

      tx.set(voteRef, {
        uid: user.uid,
        email: user.email,
        candidate: selectedCandidate,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });

      tx.set(db.collection('events').doc(), {
        type: 'vote_submitted',
        uid: user.uid,
        email: user.email,
        candidate: selectedCandidate,
        time: firebase.firestore.FieldValue.serverTimestamp()
      });
    });

    hideModal();
    showToast('Vote submitted securely', 'Your ballot has been recorded.', 3500);
    const ballotPanel = document.querySelector('.ballot-panel');
    if (ballotPanel) ballotPanel.classList.add('submitted');
    await loadCandidateStats();
  } catch (err) {
    const message = err && err.message ? err.message : 'Vote could not be submitted';
    showToast('Submission failed', message, 4000);
    throw err;
  }
}

if (submitVote) {
  submitVote.addEventListener('click', async () => {
    submitVote.disabled = true;
    submitVote.innerHTML = 'Encrypting… <span>⟳</span>';
    try {
      await submitVoteToFirestore();
    } catch (error) {
      console.error('submitVote error', error);
    } finally {
      submitVote.disabled = false;
      submitVote.innerHTML = 'Encrypt & submit <span>→</span>';
    }
  });
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    themeToggle.textContent = document.body.classList.contains('dark') ? '☀' : '◐';
    themeToggle.setAttribute('aria-label', document.body.classList.contains('dark') ? 'Switch to light mode' : 'Toggle dark mode');
  });
}

const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');
if ('IntersectionObserver' in window && sections.length && navLinks.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
      }
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach(section => observer.observe(section));
}

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

if (showSignIn) {
  showSignIn.addEventListener('click', () => {
    const card = document.querySelector('.auth-card');
    if (!card) return;
    card.classList.remove('show-signup');
    showSignIn.classList.add('active');
    if (showSignUp) showSignUp.classList.remove('active');
  });
}

if (showSignUp) {
  showSignUp.addEventListener('click', () => {
    const card = document.querySelector('.auth-card');
    if (!card) return;
    card.classList.add('show-signup');
    showSignUp.classList.add('active');
    if (showSignIn) showSignIn.classList.remove('active');
  });
}

document.querySelectorAll('.password-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const input = button.parentElement.querySelector('input');
    if (!input) return;
    const nextType = input.type === 'password' ? 'text' : 'password';
    input.type = nextType;
    button.textContent = nextType === 'password' ? '👁' : '🙈';
  });
});

function createUserProfile(user) {
  const displayName = user.displayName || user.email || 'New voter';
  const color = colorFromString(user.uid || user.email || displayName);
  return {
    email: user.email,
    displayName,
    avatarColor: color,
    avatar: generateProAvatarDataUrl(displayName, user.email, color),
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };
}

async function ensureUserProfile(user) {
  const ref = db.collection('users').doc(user.uid);
  const doc = await ref.get();

  if (!doc.exists) {
    const profile = createUserProfile(user);
    await ref.set(profile);
    return profile;
  }

  const data = doc.data();
  if (!data.avatar) {
    const profile = {
      ...data,
      avatar: generateProAvatarDataUrl(data.displayName || user.email || 'VoteSafe', user.email, data.avatarColor || colorFromString(user.uid || user.email || 'user')),
      avatarColor: data.avatarColor || colorFromString(user.uid || user.email || 'user')
    };
    await ref.update(profile);
    return profile;
  }

  return data;
}

async function updateHeader(user) {
  const profile = await ensureUserProfile(user);
  if (!profile) return;

  const avatar = profile.avatar || generateProAvatarDataUrl(profile.displayName || user.email || 'VoteSafe', user.email, profile.avatarColor || '#0d774b');
  if (headerUser) headerUser.hidden = false;
  if (headerAvatar) {
    headerAvatar.src = avatar;
    headerAvatar.hidden = false;
  }

  if (profileAvatar) {
    profileAvatar.src = avatar;
  }

  if (profileEmail) {
    profileEmail.textContent = user.email || '—';
  }

  if (profileTitle) {
    profileTitle.textContent = profile.displayName || 'Your account';
  }

  if (profileDisplayName) {
    profileDisplayName.value = profile.displayName || '';
  }
}

function toggleMobileMenu(forceState) {
  const next = typeof forceState === 'boolean' ? forceState : !mobileNavPanel.classList.contains('open');
  if (!mobileNavPanel || !mobileMenuToggle) return;
  mobileNavPanel.classList.toggle('open', next);
  mobileNavPanel.setAttribute('aria-hidden', String(!next));
  mobileMenuToggle.classList.toggle('is-open', next);
  mobileMenuToggle.setAttribute('aria-expanded', String(next));
}

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', () => toggleMobileMenu());
  document.querySelectorAll('.mobile-nav-panel .nav-link').forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(false));
  });
}

function startCountAnimation() {
  const counters = document.querySelectorAll('.count-up');
  counters.forEach(element => {
    const target = Number(element.dataset.target || 0);
    const suffix = element.dataset.suffix || '';
    const decimalPlaces = Number.isInteger(target) ? 0 : 1;
    let current = 0;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const totalSteps = 48;
        let step = 0;
        const tick = () => {
          step += 1;
          const progress = step / totalSteps;
          current = target * progress;
          if (decimalPlaces === 0) {
            element.textContent = `${Math.round(current)}${suffix}`;
          } else {
            element.textContent = `${(current).toFixed(1)}${suffix}`;
          }
          if (step < totalSteps) {
            requestAnimationFrame(tick);
          } else {
            element.textContent = `${target}${suffix}`;
          }
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      });
    }, { threshold: 0.45 });

    observer.observe(element);
  });
}

function initRevealAnimations() {
  const elements = document.querySelectorAll('.feature-card, .security-item, .ballot-panel, .glass-card, .section-heading, .cta-section, .stats-strip > div');
  elements.forEach((element, index) => {
    element.classList.add('reveal');
    element.style.transitionDelay = `${index * 70}ms`;
  });

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  elements.forEach(element => revealObserver.observe(element));
}

if (signInBtn) {
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
}

if (signUpBtn) {
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
      const avatar = generateProAvatarDataUrl(displayName || email, email, profileColor);

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
}

if (signOutBtn) {
  signOutBtn.addEventListener('click', async () => {
    try {
      await auth.signOut();
    } catch (err) {
      console.error('Sign out failed', err);
    }
    window.location.href = 'index.html';
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    try {
      await auth.signOut();
    } catch (err) {
      console.error('Sign out failed', err);
    }
    window.location.href = 'index.html';
  });
}

if (profileBtn) {
  profileBtn.addEventListener('click', () => {
    // Open full profile page for a cleaner experience
    window.location.href = 'profile.html';
  });
}

if (closeProfile) {
  closeProfile.addEventListener('click', () => {
    if (!profileModal) return;
    profileModal.hidden = true;
    profileModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  });
}

if (closeProfileFooter) {
  closeProfileFooter.addEventListener('click', () => {
    if (!profileModal) return;
    profileModal.hidden = true;
    profileModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  });
}

if (saveProfile) {
  saveProfile.addEventListener('click', async () => {
    const user = auth.currentUser;
    if (!user || !profileDisplayName) return;

    const value = profileDisplayName.value.trim();
    if (!value) {
      showToast('Profile error', 'Please add a display name.', 2500);
      return;
    }

    const profileRef = db.collection('users').doc(user.uid);
    const avatar = generateProAvatarDataUrl(value, user.email || value, colorFromString(user.uid || user.email || value));

    await profileRef.set({
      displayName: value,
      avatar,
      avatarColor: colorFromString(user.uid || user.email || value),
      email: user.email
    }, { merge: true });

    if (auth.currentUser) {
      await auth.currentUser.updateProfile({ displayName: value });
      // reload to ensure latest profile data is available
      if (auth.currentUser.reload) await auth.currentUser.reload();
    }

    showToast('Profile updated', 'Your new profile is saved.', 2200);
    updateHeader(auth.currentUser || user);
  });
}

auth.onAuthStateChanged(async user => {
  if (!user) {
    currentUserIsAdmin = false;
    showAuthOverlay();
    if (headerUser) headerUser.hidden = true;
    if (profileBtn) profileBtn.hidden = true;
    if (adminBtn) adminBtn.hidden = true;
    if (adminBtnMobile) adminBtnMobile.hidden = true;
    if (appMain) appMain.classList.add('locked');
    return;
  }

  closeAuthOverlay();
  if (appMain) appMain.classList.remove('locked');

  // determine admin via email or a server-side flag on the user document
  let isAdmin = false;
  try {
    const userDoc = await db.collection('users').doc(user.uid).get();
    // only allow the explicitly configured admin email to see admin UI
    isAdmin = !!user.email && user.email.toLowerCase() === adminEmail.toLowerCase();
  } catch (err) {
    console.error('Admin check failed', err);
    isAdmin = !!user.email && user.email.toLowerCase() === adminEmail.toLowerCase();
  }

  currentUserIsAdmin = isAdmin;

  if (headerUser) headerUser.hidden = false;
  if (profileBtn) profileBtn.hidden = false;
  if (adminBtn) adminBtn.hidden = !isAdmin;
  if (adminBtnMobile) adminBtnMobile.hidden = !isAdmin;
  if (signOutBtn) signOutBtn.hidden = false;

  await updateHeader(user);
  // start live candidate updates for this user
  if (candidatesUnsub) candidatesUnsub();
  candidatesUnsub = db.collection('candidates').orderBy('order').onSnapshot(() => {
    // refresh stats (counts + candidate list)
    loadCandidateStats().catch(err => console.error('loadCandidateStats failed', err));
  });
  // load immediately for this session
  try {
    await loadCandidateStats();
  } catch (err) {
    console.error('Initial loadCandidateStats failed', err);
  }

  if (auth.currentUser && !auth.currentUser.emailVerified) {
    // keep signed in users in the app without blocking access
  }

  if (auth.currentUser && !isAdmin) {
    // regular user flow remains open; admin route is guarded in admin.js
  }
});

if (appLoader) {
  setLoadingScreen(true);
  window.addEventListener('load', () => {
    Promise.allSettled([
      ensureSeedCandidates(),
      auth.currentUser ? loadCandidateStats() : Promise.resolve()
    ]).catch(error => console.error('Candidate load failed', error));

    setTimeout(() => setLoadingScreen(false), 1100);
  });
}

startCountAnimation();
initRevealAnimations();
