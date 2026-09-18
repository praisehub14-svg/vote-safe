# Vote Safe - Source Code Documentation

This document contains the main source code used in the Vote Safe project. Each section below shows the file name and the code used in that file.

---

## index.html

Purpose: This is the main homepage of the voting system. It contains the landing page, voting section, security information, login/signup forms, and the public UI for the election.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; base-uri 'self'; object-src 'none'; img-src 'self' data: https: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.gstatic.com https://www.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; connect-src 'self' https://www.gstatic.com https://*.firebaseapp.com https://*.googleapis.com https://*.firebaseio.com wss://*.firebaseio.com; upgrade-insecure-requests;" />
  <meta name="referrer" content="strict-origin-when-cross-origin" />
  <meta name="color-scheme" content="light dark" />
  <meta name="theme-color" content="#159b63" />
  <meta name="description" content="Vote Safe - Secure online voting for Dr Ogbonnaya Onu Polytechnic, Aba, Abia State." />
  <title>Vote Safe | Secure Campus Voting</title>
  <link rel="icon" type="image/svg+xml" href="assets/favicon.svg" />
  <link rel="apple-touch-icon" href="assets/favicon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="style.css" />
  <link rel="stylesheet" href="assets/auth.css" />
</head>
<body>
  <div id="appLoader" class="app-loader">
    <div class="loader-orb"></div>
    <div class="loader-ring ring-one"></div>
    <div class="loader-ring ring-two"></div>
    <div class="loader-text">
      <span>Vote</span><strong>Safe</strong>
      <small>Secure voting portal</small>
    </div>
  </div>

  <div class="page-shell" id="appMain">
    <header class="site-header" id="home">
      <a class="brand" href="#home" aria-label="Vote Safe home">
        <img src="assets/logo.svg" alt="Vote Safe logo" class="brand-logo" />
        <span>Vote<span class="brand-accent">Safe</span></span>
      </a>

      <nav class="main-nav" aria-label="Main navigation">
        <a class="nav-link active" href="#home">Home</a>
        <a class="nav-link" href="#how-it-works">How it works</a>
        <a class="nav-link" href="#security">Security</a>
        <a class="nav-link" href="#about">About</a>
      </nav>

      <div class="header-actions">
        <button class="icon-button" id="themeToggle" type="button" aria-label="Toggle dark mode" title="Toggle dark mode">◐</button>
        <a class="button button-small button-outline hide-mobile" href="#vote">Start voting <span>→</span></a>
        <div class="header-user" id="headerUser" hidden>
          <button id="profileBtn" class="profile-btn" title="Open profile">
            <img id="headerAvatar" src="" alt="avatar" />
          </button>
        </div>
        <a id="adminBtn" class="button button-small button-primary hide-mobile" href="admin.html" hidden>Admin dashboard</a>

        <button class="mobile-menu-toggle" id="mobileMenuToggle" type="button" aria-label="Toggle navigation" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>

      <div class="mobile-nav-panel" id="mobileNavPanel" aria-hidden="true">
        <a class="nav-link active" href="#home">Home</a>
        <a class="nav-link" href="#how-it-works">How it works</a>
        <a class="nav-link" href="#security">Security</a>
        <a class="nav-link" href="#about">About</a>
        <a class="button button-primary" href="#vote">Cast your vote</a>
        <a id="adminBtnMobile" class="button button-primary" href="admin.html" hidden>Admin dashboard</a>
      </div>
    </header>

    <main>
      <section class="hero section-container">
        <div class="hero-copy">
          <div class="eyebrow"><span class="pulse-dot"></span> Secure • Transparent • Accessible</div>
          <h1>Your voice.<br /><span>Your future in motion.</span></h1>
          <p class="hero-text">A modern and secure way for students and staff to participate in campus elections. Your vote is encrypted, private, and counted with confidence.</p>
          <div class="hero-actions">
            <a class="button button-primary" href="#vote">Cast your vote <span>→</span></a>
            <a class="text-link" href="#how-it-works">Learn how it works <span>↗</span></a>
          </div>
          <div class="trust-row">
            <div class="avatar-stack" aria-hidden="true"><span>JD</span><span>AM</span><span>KW</span><span>+</span></div>
            <div><strong class="count-up" data-target="12480" data-suffix="+">0</strong><small>secure votes cast</small></div>
            <span class="trust-divider"></span>
            <div class="verified-text"><span>✓</span> Built for trust</div>
          </div>

        </div>

        <div class="hero-visual" aria-label="Secure digital ballot illustration">
          <div class="orb orb-one"></div>
          <div class="orb orb-two"></div>
          <div class="shield-card glass-card">
            <div class="shield-icon">✓</div>
            <div><strong>Your vote is protected</strong><span>End-to-end encrypted</span></div>
            <span class="secure-badge">SECURE</span>
          </div>
          <div class="ballot-card glass-card">
            <div class="card-topline"><span class="mini-logo">VS</span><div><strong>Student election ballot</strong><small>Ballot #DOP-2026-0917</small></div><span class="lock">⌑</span></div>
            <div class="ballot-line"></div>
            <div class="ballot-option selected"><span class="radio-check">✓</span><span>Community First</span><b>01</b></div>
            <div class="ballot-option"><span class="radio-empty"></span><span>Future Forward</span><b>02</b></div>
            <div class="ballot-option"><span class="radio-empty"></span><span>People's Choice</span><b>03</b></div>
            <div class="encrypted-row"><span>▣</span> Ballot encrypted <strong>100%</strong></div>
          </div>
          <div class="floating-card live-card"><span class="live-dot"></span><div><strong>Election is live</strong><small>Closes in 02:14:36</small></div></div>
          <div class="floating-card verified-card"><span class="check-circle">✓</span><div><strong>Verified identity</strong><small>Access approved</small></div></div>
        </div>
      </section>

      <section class="stats-strip section-container" aria-label="Vote Safe statistics">
        <div><strong class="count-up" data-target="256" data-suffix="-bit">0</strong><span>Data encryption</span></div>
        <div><strong class="count-up" data-target="99.9" data-suffix="%">0</strong><span>System uptime</span></div>
        <div><strong class="count-up" data-target="100" data-suffix="%">0</strong><span>Anonymous ballots</span></div>
        <div><strong class="count-up" data-target="24" data-suffix="/7">0</strong><span>Monitoring</span></div>
      </section>

      <section class="section-container info-section" id="how-it-works">
        <div class="section-heading">
          <div>
            <div class="eyebrow">A better way to participate</div>
            <h2>Voting made simple.<br /><em>Security made serious.</em></h2>
          </div>
          <p>Vote Safe combines an easy-to-use experience with strong security measures so every eligible voter can participate with confidence.</p>
        </div>
        <div class="feature-grid">
          <article class="feature-card"><span class="feature-number">01</span><div class="feature-icon">⌁</div><h3>Verify your identity</h3><p>Confirm your identity through a secure verification step before accessing your ballot.</p><a href="#security">Explore security <span>→</span></a></article>
          <article class="feature-card featured"><span class="feature-number">02</span><div class="feature-icon">▣</div><h3>Cast your ballot</h3><p>Choose your candidate with a clear, accessible, and simple voting interface.</p><a href="#vote">Try a demo vote <span>→</span></a></article>
          <article class="feature-card"><span class="feature-number">03</span><div class="feature-icon">✓</div><h3>Trust the count</h3><p>Your encrypted vote is recorded anonymously and can be independently verified.</p><a href="#security">See our promise <span>→</span></a></article>
        </div>
      </section>

      <section class="vote-section section-container" id="vote">
        <div class="section-heading compact">
          <div>
            <div class="eyebrow">Dr Ogbonnaya Onu Polytechnic • Live election • 2026</div>
            <h2>Make your choice</h2>
          </div>
          <div class="election-status"><span class="live-dot"></span> Voting is open <small>Closes today at 8:00 PM</small></div>
        </div>

        <div class="ballot-panel">
          <div class="ballot-panel-head">
            <div>
              <h3>Who should represent your community?</h3>
              <p>Select one candidate. Review the choice before submitting.</p>
            </div>
            <span class="step-label">STEP 1 <b>OF 2</b></span>
          </div>

          <div class="candidate-grid" id="candidateGrid"></div>

          <div class="ballot-footer">
            <span class="privacy-note">⌑ Your selection is private and encrypted</span>
            <button class="button button-primary" id="reviewVote" type="button" disabled>Review selection <span>→</span></button>
          </div>
        </div>
      </section>

      <section class="security-section section-container" id="security">
        <div class="security-copy">
          <div class="eyebrow">Protection by design</div>
          <h2>Built on a foundation<br /><em>of trust.</em></h2>
          <p>Vote Safe uses multiple layers of protection to keep your identity and ballot secure from the moment you sign in to the moment your vote is counted.</p>
          <a class="text-link" href="#about">Read our security promise <span>↗</span></a>
        </div>
        <div class="security-list">
          <div class="security-item"><span class="security-list-icon">⌑</span><div><strong>End-to-end encryption</strong><p>Your ballot is encrypted before it leaves your device.</p></div><span class="security-check">✓</span></div>
          <div class="security-item"><span class="security-list-icon">◉</span><div><strong>Anonymous by default</strong><p>Your identity is separated from your vote.</p></div><span class="security-check">✓</span></div>
          <div class="security-item"><span class="security-list-icon">◌</span><div><strong>Transparent verification</strong><p>Every vote can be validated without revealing who cast it.</p></div><span class="security-check">✓</span></div>
        </div>
      </section>

      <section class="cta-section section-container" id="about">
        <div>
          <div class="eyebrow">Your participation matters</div>
          <h2>Ready to make<br /><em>your voice heard?</em></h2>
        </div>
        <a class="button button-light" href="#vote">Start voting now <span>→</span></a>
      </section>
    </main>

    <footer class="site-footer">
      <div class="footer-brand">
        <a class="brand" href="#home"><img src="assets/logo.svg" alt="Vote Safe logo" class="brand-logo" /><span>Vote<span class="brand-accent">Safe</span></span></a>
        <p>Secure elections — Dr Ogbonnaya Onu Polytechnic, Aba, Abia State.</p>
      </div>
      <div class="footer-links">
        <a href="#security">Privacy</a>
        <a href="#security">Security</a>
        <a href="#about">Accessibility</a>
        <a href="#about">Contact</a>
      </div>
      <p class="copyright">© 2026 Vote Safe — Dr Ogbonnaya Onu Polytechnic, Aba, Abia State.</p>
    </footer>
  </div>

  <div class="modal-backdrop" id="reviewModal" aria-hidden="true">
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <button class="modal-close" id="closeModal" type="button" aria-label="Close dialog">×</button>
      <div class="modal-icon">✓</div>
      <div class="eyebrow">Ready to submit</div>
      <h2 id="modalTitle">Review your vote</h2>
      <p>You selected <strong id="selectedCandidate">—</strong>. Your ballot will be encrypted and submitted anonymously.</p>
      <div class="encryption-status">
        <span class="spinner-check">✓</span>
        <div><strong>Encryption ready</strong><small>RSA-2048 + AES-256 simulation active</small></div>
        <span class="status-online">ONLINE</span>
      </div>
      <div class="security-score-box" aria-live="polite">
        <div class="security-score-head">
          <span>Ballot integrity</span>
          <strong id="ballotTrustValue">98.6%</strong>
        </div>
        <div class="security-score-bar"><span id="ballotTrustBar"></span></div>
      </div>
      <div class="modal-actions">
        <button class="button button-outline" id="editVote" type="button">Go back</button>
        <button class="button button-primary" id="submitVote" type="button">Encrypt & submit <span>→</span></button>
      </div>
    </div>
  </div>

  <div class="toast" id="toast" role="status" aria-live="polite">
    <span>✓</span>
    <div><strong>Vote submitted securely</strong><small>Your anonymous ballot has been recorded.</small></div>
  </div>

  <div class="auth-overlay" id="authOverlay" hidden>
    <div class="auth-card">
      <div class="auth-head">
        <h2>Welcome to Vote Safe</h2>
        <p id="authNotice">Sign in or create an account to continue.</p>
      </div>

      <div class="auth-tabs">
        <button id="showSignIn" class="button button-outline active" type="button">Sign in</button>
        <button id="showSignUp" class="button button-outline" type="button">Create account</button>
      </div>

      <div class="auth-forms">
        <div class="auth-panel" id="authPanel">
          <form id="signInForm" class="auth-form active" aria-label="Sign in form" novalidate>
            <div class="field"><label for="signInEmail">Institution email</label><input id="signInEmail" type="email" placeholder="you@school.edu" required /></div>
            <div class="field password-field"><label for="signInPassword">Password</label><input id="signInPassword" type="password" placeholder="••••••••" required /><button type="button" class="password-toggle" aria-label="Toggle password visibility">👁</button></div>
            <div class="auth-row">
              <label class="check-row"><input type="checkbox" id="rememberSession" checked /> <span>Keep me signed in</span></label>
              <button type="button" class="text-link mini-link">Need help?</button>
            </div>
            <div class="auth-actions"><button id="signInBtn" type="submit" class="button button-primary button-animated">Sign in securely</button></div>
          </form>

          <form id="signUpForm" class="auth-form" aria-label="Sign up form" novalidate>
            <div class="field-grid">
              <div class="field"><label for="signUpDisplayName">Full name</label><input id="signUpDisplayName" type="text" placeholder="Your name" required /></div>
              <div class="field"><label for="studentId">Student ID</label><input id="studentId" type="text" placeholder="DOP/2026/001" required /></div>
            </div>
            <div class="field"><label for="signUpEmail">Institution email</label><input id="signUpEmail" type="email" placeholder="you@school.edu" required /></div>
            <div class="field"><label for="departmentName">Department</label><input id="departmentName" type="text" placeholder="Computer Science" required /></div>
            <div class="field password-field"><label for="signUpPassword">Password</label><input id="signUpPassword" type="password" placeholder="Create a strong password" required /><button type="button" class="password-toggle" aria-label="Toggle password visibility">👁</button></div>
            <div class="strength-meter" aria-live="polite"><div class="strength-labels"><span>Password strength</span><strong id="passwordStrengthText">Weak</strong></div><div class="strength-bar"><span id="passwordStrengthBar"></span></div></div>
            <div class="field password-field"><label for="signUpConfirmPassword">Confirm password</label><input id="signUpConfirmPassword" type="password" placeholder="Confirm password" required /><button type="button" class="password-toggle" aria-label="Toggle password visibility">👁</button></div>
            <label class="check-row consent-row"><input type="checkbox" id="acceptTerms" required /> <span>I understand this is a secure campus voting system and agree to the terms.</span></label>
            <div class="auth-actions"><button id="signUpBtn" type="submit" class="button button-primary button-animated">Create account</button></div>
          </form>
        </div>
      </div>

      <div class="auth-foot"><button id="signOutBtn" class="text-link" type="button" hidden>Sign out</button></div>
    </div>
  </div>

  <div class="modal-backdrop" id="profileModal" aria-hidden="true" hidden>
    <div class="modal profile-modal" role="dialog" aria-modal="true" aria-labelledby="profileTitle">
      <button class="modal-close" id="closeProfile" type="button" aria-label="Close profile">×</button>
      <div class="profile-header">
        <div class="profile-avatar-wrap">
          <img id="profileAvatar" src="" alt="profile avatar" />
        </div>
        <div>
          <div class="eyebrow">Profile</div>
          <h2 id="profileTitle">Your account</h2>
        </div>
      </div>

      <div class="profile-meta">
        <span class="profile-badge">Signed in as</span>
        <p id="profileEmail">—</p>
      </div>

      <label class="profile-field">
        <span>Display name</span>
        <input id="profileDisplayName" type="text" placeholder="Your full name" />
      </label>

      <div class="profile-actions">
        <button id="closeProfileFooter" class="button button-outline" type="button">Close</button>
        <button id="saveProfile" class="button button-primary" type="button">Save profile</button>
        <button id="logoutBtn" class="button button-danger" type="button">Logout</button>
      </div>
    </div>
  </div>

  <script src="https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.22.1/firebase-auth-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.22.1/firebase-functions-compat.js"></script>
  <script src="script.js"></script>
</body>
</html>
```

---

## script.js

Purpose: This is the main JavaScript logic for the website. It handles authentication, candidate selection, vote submission, admin visibility, profile updates, dark mode, mobile menu, and UI behavior.

```javascript
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
const signInForm = document.getElementById('signInForm');
const signInBtn = document.getElementById('signInBtn');
const rememberSession = document.getElementById('rememberSession');
const signUpDisplayName = document.getElementById('signUpDisplayName');
const studentId = document.getElementById('studentId');
const signUpEmail = document.getElementById('signUpEmail');
const departmentName = document.getElementById('departmentName');
const signUpPassword = document.getElementById('signUpPassword');
const signUpConfirmPassword = document.getElementById('signUpConfirmPassword');
const acceptTerms = document.getElementById('acceptTerms');
const passwordStrengthBar = document.getElementById('passwordStrengthBar');
const passwordStrengthText = document.getElementById('passwordStrengthText');
const signUpBtn = document.getElementById('signUpBtn');
const ballotTrustBar = document.getElementById('ballotTrustBar');
const ballotTrustValue = document.getElementById('ballotTrustValue');
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
let turnoutTarget = 3;
let turnoutPulseTimer = null;
const adminEmail = 'praise234@gmail.com';

function setAdminControlsVisible(isAdmin) {
  const adminVisible = !!isAdmin && !!auth.currentUser && auth.currentUser.email && auth.currentUser.email.toLowerCase() === adminEmail.toLowerCase();
  [adminBtn, adminBtnMobile].forEach(button => {
    if (!button) return;
    if (adminVisible) {
      button.hidden = false;
      button.removeAttribute('hidden');
      button.style.display = '';
      button.setAttribute('aria-hidden', 'false');
      return;
    }

    button.hidden = true;
    button.setAttribute('hidden', 'hidden');
    button.style.display = 'none';
    button.setAttribute('aria-hidden', 'true');
  });
}

if (adminBtn) {
  adminBtn.hidden = true;
  adminBtn.style.display = 'none';
}
if (adminBtnMobile) {
  adminBtnMobile.hidden = true;
  adminBtnMobile.style.display = 'none';
}

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

const adminPermissionError = 'Insufficient permission. Please sign in with the admin account or contact the election manager.';

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

function updateTurnoutDisplay(value, label = 'Waiting for the first voter') {
  const fill = document.getElementById('turnoutFill');
  const total = document.getElementById('turnoutValue');
  const summary = document.getElementById('turnoutSummary');
  const hint = document.getElementById('turnoutHint');
  if (!fill || !total || !summary || !hint) return;

  const percent = Math.max(0, Math.min(100, Number(value) || 0));
  total.textContent = `${percent.toFixed(0)}%`;
  fill.style.width = `${percent}%`;
  fill.style.filter = percent > 55 ? 'saturate(1.2)' : 'saturate(1)';
  summary.textContent = label;
  hint.textContent = percent < 8 ? 'Flow stays calm until a new voter joins' : 'Voter momentum is building';
}

function setTurnoutTarget(value, label) {
  turnoutTarget = Math.max(3, Math.min(100, Number(value) || 3));
  const finalLabel = label || (turnoutTarget < 10 ? 'Waiting for the first voter' : turnoutTarget < 35 ? 'Voters are joining the queue' : turnoutTarget < 70 ? 'Momentum is building' : 'Election is moving fast');
  updateTurnoutDisplay(turnoutTarget, finalLabel);
}

function startTurnoutPulse() {
  if (turnoutPulseTimer) clearInterval(turnoutPulseTimer);
  turnoutPulseTimer = null;
  turnoutTarget = 3;
  updateTurnoutDisplay(3, 'Waiting for the first voter');
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

function calculatePasswordStrength(password) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  if (password.length >= 12) score += 1;

  const strengthMap = [
    { label: 'Weak', ratio: 25 },
    { label: 'Fair', ratio: 45 },
    { label: 'Strong', ratio: 72 },
    { label: 'Very strong', ratio: 100 }
  ];

  const label = score <= 2 ? 'Weak' : score === 3 ? 'Fair' : score === 4 ? 'Strong' : 'Very strong';
  const ratio = strengthMap.find(item => item.label === label)?.ratio || 25;
  return { label, ratio };
}

function updatePasswordStrength() {
  if (!signUpPassword || !passwordStrengthBar || !passwordStrengthText) return;
  const password = signUpPassword.value;
  const { label, ratio } = calculatePasswordStrength(password);
  passwordStrengthText.textContent = label;
  passwordStrengthBar.style.width = `${ratio}%`;
  passwordStrengthBar.style.background = ratio < 40 ? 'linear-gradient(90deg, #ef4444, #f59e0b)' : ratio < 75 ? 'linear-gradient(90deg, #f59e0b, #22c55e)' : 'linear-gradient(90deg, #22c55e, #16a34a)';
}

function setBallotTrust(value) {
  const percent = Math.min(100, Math.max(0, Number(value) || 0));
  if (ballotTrustBar) ballotTrustBar.style.width = `${percent}%`;
  if (ballotTrustValue) ballotTrustValue.textContent = `${percent.toFixed(1)}%`;
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

  if (!selectedCandidate) {
    throw new Error('Please choose a candidate before submitting your ballot.');
  }

  try {
    const voteRef = db.collection('votes').doc(user.uid);

    await db.runTransaction(async (tx) => {
      const voteDoc = await tx.get(voteRef);
      if (voteDoc.exists) {
        throw new Error('You have already voted in this election.');
      }

      const userDoc = await tx.get(db.collection('users').doc(user.uid));
      const userProfile = userDoc.exists ? userDoc.data() : {};

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

    setBallotTrust(98.6);
    hideModal();
    showToast('Vote submitted securely', 'Your anonymous ballot has been recorded.', 3500);
    const ballotPanel = document.querySelector('.ballot-panel');
    if (ballotPanel) ballotPanel.classList.add('submitted');
    await loadCandidateStats();
  } catch (err) {
    const message = err && err.message ? err.message : 'Vote could not be submitted';
    setBallotTrust(72.1);
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

if (signUpPassword) {
  signUpPassword.addEventListener('input', updatePasswordStrength);
}

if (showSignIn) {
  showSignIn.addEventListener('click', () => {
    const card = document.querySelector('.auth-card');
    if (!card) return;
    showSignIn.classList.add('active');
    if (showSignUp) showSignUp.classList.remove('active');
    const signInFormEl = document.getElementById('signInForm');
    const signUpFormEl = document.getElementById('signUpForm');
    if (signInFormEl) signInFormEl.classList.add('active');
    if (signUpFormEl) signUpFormEl.classList.remove('active');
  });
}

if (showSignUp) {
  showSignUp.addEventListener('click', () => {
    const card = document.querySelector('.auth-card');
    if (!card) return;
    showSignUp.classList.add('active');
    if (showSignIn) showSignIn.classList.remove('active');
    const signInFormEl = document.getElementById('signInForm');
    const signUpFormEl = document.getElementById('signUpForm');
    if (signInFormEl) signInFormEl.classList.remove('active');
    if (signUpFormEl) signUpFormEl.classList.add('active');
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
  signInBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const email = signInEmail?.value?.trim();
    const password = signInPassword?.value || '';

    if (!email || !password) {
      showToast('Missing details', 'Please enter your email and password.', 3000);
      return;
    }

    setButtonLoading(signInBtn, true, 'Signing in…');
    try {
      const persistence = rememberSession && rememberSession.checked ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION;
      await auth.setPersistence(persistence);
      await auth.signInWithEmailAndPassword(email, password);
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
  signUpBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    setButtonLoading(signUpBtn, true, 'Creating account…');
    try {
      const displayName = signUpDisplayName.value.trim();
      const email = signUpEmail.value.trim();
      const password = signUpPassword.value;
      const confirm = signUpConfirmPassword.value;
      const registrationId = studentId?.value?.trim() || '';
      const department = departmentName?.value?.trim() || '';

      if (!displayName || !email || !password || !confirm) {
        throw new Error('Please complete all required fields.');
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('Please enter a valid institution email.');
      }

      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long.');
      }

      if (calculatePasswordStrength(password).label === 'Weak') {
        throw new Error('Choose a stronger password for secure voting access.');
      }

      if (password !== confirm) {
        throw new Error('Passwords do not match.');
      }

      if (!acceptTerms || !acceptTerms.checked) {
        throw new Error('You must accept the secure voting terms before creating an account.');
      }

      const cred = await auth.createUserWithEmailAndPassword(email, password);
      const profileColor = colorFromString(cred.user.uid || email);
      const avatar = generateProAvatarDataUrl(displayName || email, email, profileColor);

      await db.collection('users').doc(cred.user.uid).set({
        email,
        displayName,
        studentId: registrationId,
        department,
        avatarColor: profileColor,
        avatar,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });

      if (auth.currentUser) {
        await auth.currentUser.updateProfile({ displayName });
      }

      authNotice.textContent = 'Account created successfully';
      showToast('Account created', 'Welcome — signing in.', 3000);
      setTimeout(() => {
        showSignIn.click();
      }, 500);
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
      if (auth.currentUser.reload) await auth.currentUser.reload();
    }

    showToast('Profile updated', 'Your new profile is saved.', 2200);
    updateHeader(auth.currentUser || user);
  });
}

auth.onAuthStateChanged(async user => {
  if (!user) {
    currentUserIsAdmin = false;
    setAdminControlsVisible(false);
    showAuthOverlay();
    if (headerUser) headerUser.hidden = true;
    if (profileBtn) profileBtn.hidden = true;
    if (signOutBtn) signOutBtn.hidden = true;
    if (appMain) appMain.classList.add('locked');
    return;
  }

  closeAuthOverlay();
  if (appMain) appMain.classList.remove('locked');

  let isAdmin = false;
  try {
    const userDoc = await db.collection('users').doc(user.uid).get();
    isAdmin = !!user.email && user.email.toLowerCase() === adminEmail.toLowerCase();
    if (userDoc.exists && userDoc.data()?.isAdmin === true && user.email && user.email.toLowerCase() === adminEmail.toLowerCase()) {
      isAdmin = true;
    }
  } catch (err) {
    console.error('Admin check failed', err);
    isAdmin = !!user.email && user.email.toLowerCase() === adminEmail.toLowerCase();
  }

  currentUserIsAdmin = isAdmin;

  if (headerUser) headerUser.hidden = false;
  if (profileBtn) profileBtn.hidden = false;
  setAdminControlsVisible(isAdmin);
  if (signOutBtn) signOutBtn.hidden = false;

  await updateHeader(user);
  if (candidatesUnsub) candidatesUnsub();
  candidatesUnsub = db.collection('candidates').orderBy('order').onSnapshot(() => {
    loadCandidateStats().catch(err => console.error('loadCandidateStats failed', err));
  });

  try {
    await loadCandidateStats();
  } catch (err) {
    console.error('Initial loadCandidateStats failed', err);
  }
});

if (appLoader) {
  setLoadingScreen(true);
  window.addEventListener('load', () => {
    Promise.allSettled([
      ensureSeedCandidates(),
      auth.currentUser ? loadCandidateStats() : Promise.resolve()
    ]).catch(error => console.error('Candidate load failed', error));

    setTurnoutTarget(3, 'Waiting for the first voter');
    setBallotTrust(98.6);
    setTimeout(() => setLoadingScreen(false), 1100);
  });
}

updatePasswordStrength();
startTurnoutPulse();
startCountAnimation();
initRevealAnimations();
```

---

## style.css

Purpose: This file contains the main styling for the whole website. It defines the layout, colors, buttons, cards, voting interface, responsiveness, and overall visual design.

```css
:root {
  --ink: #10251d;
  --muted: #65756e;
  --green: #159b63;
  --green-dark: #087348;
  --mint: #dff8ea;
  --line: #dfe9e4;
  --white: #ffffff;
  --bg: #f5fff9;
  --shadow: 0 22px 55px rgba(9, 77, 46, 0.13);
  --overlay: rgba(7, 24, 18, 0.58);
  --radius: 22px;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  font-family: 'Inter', Arial, sans-serif;
  background: linear-gradient(180deg, #f5fff9 0%, #edf9f2 100%);
  color: var(--ink);
  line-height: 1.5;
  overflow-x: hidden;
}
body.dark {
  --ink: #ecfff6;
  --muted: #b7d9ca;
  --line: #27483a;
  --white: #10251d;
  --bg: #071812;
  --shadow: 0 22px 55px rgba(0, 0, 0, 0.22);
  background: linear-gradient(180deg, #071812 0%, #0d1d18 100%);
}
body.dark .hero-text,
body.dark .feature-card p,
body.dark .section-heading p,
body.dark .security-copy p,
body.dark .security-item p,
body.dark .privacy-note,
body.dark .candidate-details small,
body.dark .auth-head p,
body.dark .auth-form label,
body.dark .check-row,
body.dark .profile-meta p,
body.dark .profile-field span,
body.dark .field label,
body.dark .candidate-meta.is-private,
body.dark .turnout-meta,
body.dark .turnout-head span,
body.dark .stat-label,
body.dark .footer-brand p,
body.dark .footer-links a,
body.dark .copyright,
body.dark .modal p {
  color: #d4f5e5 !important;
}
body.dark .auth-form input,
body.dark .profile-field input,
body.dark .candidate-form input,
body.dark .button-outline,
body.dark .button-light {
  color: #f3fff8 !important;
}
body.is-loading { overflow: hidden; }
img { max-width: 100%; display: block; }
a { text-decoration: none; }
button, input { font: inherit; }
#adminBtn[hidden], #adminBtnMobile[hidden] { display: none !important; }
.page-shell { min-height: 100vh; opacity: 1; transition: opacity .5s ease; }
.page-shell.locked { filter: blur(4px); pointer-events: none; }
.section-container, .site-header, .site-footer { width: min(1160px, calc(100% - 48px)); margin-inline: auto; }
.site-header {
  height: 86px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(16px);
  background: rgba(245, 255, 249, 0.76);
}
body.dark .site-header { background: rgba(7, 24, 18, 0.72); }
.brand { display: inline-flex; align-items: center; gap: 10px; color: var(--ink); font-family: 'Space Grotesk', sans-serif; font-size: 21px; font-weight: 700; text-decoration: none; }
.brand-logo { height: 38px; animation: logoFloat 2.6s ease-in-out infinite; filter: drop-shadow(0 10px 18px rgba(18,121,80,0.22)); }
@keyframes logoFloat { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-5px) rotate(-4deg); } }
.brand-accent { color: var(--green); }
.main-nav { display: flex; gap: 32px; margin-left: auto; margin-right: 28px; }
.nav-link { color: var(--muted); font-size: 13px; font-weight: 600; transition: color .2s ease; }
.nav-link:hover, .nav-link.active { color: var(--green); }
.header-actions { display: flex; align-items: center; gap: 11px; }
.icon-button {
  border: none; background: transparent; color: var(--muted); font-size: 23px; cursor: pointer; padding: 7px; transition: .25s ease;
}
.icon-button:hover { color: var(--green); transform: rotate(22deg) scale(1.1); }
.button {
  border: 0; border-radius: 11px; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 14px; padding: 14px 21px; font-size: 13px; font-weight: 700; letter-spacing: .1px; text-decoration: none; transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease; position: relative; overflow: hidden;
}
.button:hover { transform: translateY(-2px); }
.button-small { padding: 11px 16px; }
.button-primary {
  background: linear-gradient(120deg, var(--green), var(--green-dark));
  color: var(--white);
  box-shadow: 0 16px 28px rgba(21, 155, 99, 0.22);
}
.button-light { background: rgba(255,255,255,0.7); color: var(--ink); box-shadow: var(--shadow); }
.button-outline { background: rgba(21,155,99,0.05); color: var(--ink); border: 1px solid rgba(21,155,99,0.14); }
.button-danger { background: linear-gradient(135deg, #f45c5c, #d93a3a); color: white; }
.button-primary::after, .button-danger::after { content: ''; position: absolute; inset: 0; background: linear-gradient(120deg, rgba(255,255,255,0.12), rgba(255,255,255,0)); transform: translateX(-100%); transition: transform .7s cubic-bezier(.2,.9,.2,1); }
.button-primary:hover::after, .button-danger:hover::after { transform: translateX(0); }
.button.loading { pointer-events: none; opacity: .96; }
.button.loading::after {
  content: ''; position: absolute; right: 12px; top: 50%; transform: translateY(-50%); width: 16px; height: 16px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.35); border-top-color: rgba(255,255,255,1); animation: spin .9s linear infinite;
}
@keyframes spin { to { transform: translateY(-50%) rotate(360deg); } }

.hero { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 36px; align-items: center; padding: 54px 0 42px; }
.hero-copy h1 { margin: 10px 0 18px; font-size: clamp(2.8rem, 5vw, 5rem); line-height: .96; letter-spacing: -.06em; font-weight: 800; }
.hero-copy h1 span { color: var(--green); }
.eyebrow { display: inline-flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; color: var(--green); }
.pulse-dot { display: inline-block; width: 9px; height: 9px; border-radius: 50%; background: var(--green); box-shadow: 0 0 0 0 rgba(21,155,99,.6); animation: pulse 1.8s infinite; }
@keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(21,155,99,.6); } 70% { box-shadow: 0 0 0 20px rgba(21,155,99,0); } 100% { box-shadow: 0 0 0 0 rgba(21,155,99,0); } }
.hero-text { max-width: 580px; color: var(--muted); font-size: 1.02rem; }
.hero-actions { display: flex; align-items: center; gap: 18px; margin-top: 18px; }
.text-link { display: inline-flex; align-items: center; gap: 8px; color: var(--green-dark); font-weight: 700; }
.trust-row { display: flex; align-items: center; gap: 18px; margin-top: 28px; color: var(--muted); }
.turnout-panel {
  margin-top: 18px;
  padding: 16px 16px 14px;
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(255,255,255,0.75), rgba(230,255,240,0.9));
  border: 1px solid rgba(21,155,99,0.1);
  box-shadow: 0 18px 38px rgba(9,77,46,0.08);
}
.turnout-head {
  display: flex; align-items: center; justify-content: space-between;
  gap: 12px; margin-bottom: 12px;
  color: var(--ink);
  font-size: 12px; font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.turnout-head strong {
  color: var(--green-dark);
  letter-spacing: 0;
  font-size: 20px;
  text-transform: none;
}
.tube-meter {
  position: relative;
  height: 22px;
  border-radius: 999px;
  background: rgba(16,37,29,0.06);
  overflow: hidden;
  border: 1px solid rgba(21,155,99,0.08);
  box-shadow: inset 0 2px 8px rgba(9,77,46,0.08);
}
.tube-fill {
  position: relative;
  width: 3%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #0cd177, #0d8d5f 60%, #0b5c42);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.2), 0 0 18px rgba(19,156,96,0.22);
  transition: none;
  min-width: 8px;
  animation: none;
}
.tube-wave {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(255,255,255,0.18), rgba(255,255,255,0.72), rgba(255,255,255,0.18));
  transform: none;
  animation: none;
  opacity: 0.2;
}
.turnout-meta {
  display: flex; justify-content: space-between; gap: 12px;
  margin-top: 12px;
  font-size: 11px;
  color: var(--muted);
}
.turnout-meta small:last-child { text-align: right; }
.avatar-stack { display: flex; align-items: center; }
.avatar-stack span { width: 34px; height: 34px; border-radius: 50%; display: grid; place-items: center; border: 2px solid var(--white); background: linear-gradient(135deg, #c9ffe8, #8ed6af); color: var(--green-dark); font-size: 10px; font-weight: 800; margin-left: -8px; }
.avatar-stack span:first-child { margin-left: 0; }
.trust-divider { width: 1px; height: 22px; background: var(--line); }
.verified-text { display: inline-flex; align-items: center; gap: 8px; color: var(--ink); font-weight: 700; }
.hero-visual { position: relative; height: 510px; display: grid; place-items: center; }
.orb { position: absolute; border-radius: 50%; filter: blur(18px); }
.orb-one { width: 280px; height: 280px; background: rgba(32,188,120,.18); top: 40px; right: 70px; }
.orb-two { width: 220px; height: 220px; background: rgba(8,115,72,.12); left: 40px; bottom: 35px; }
.glass-card { position: absolute; background: rgba(255,255,255,0.7); backdrop-filter: blur(18px); border: 1px solid rgba(255,255,255,0.7); box-shadow: var(--shadow); border-radius: 20px; }
.shield-card { left: 52px; top: 66px; width: 250px; padding: 18px; display: flex; align-items: center; gap: 12px; }
.shield-icon { width: 44px; height: 44px; border-radius: 14px; background: linear-gradient(135deg, var(--green), var(--green-dark)); display: grid; place-items: center; color: var(--white); font-size: 22px; font-weight: 800; }
.shield-card strong, .ballot-card strong { display: block; font-size: 13px; }
.shield-card span, .ballot-card small { color: var(--muted); }
.secure-badge { margin-left: auto; background: rgba(21,155,99,.08); color: var(--green-dark); border-radius: 999px; padding: 6px 10px; font-size: 10px; font-weight: 800; }
.ballot-card { right: 35px; bottom: 50px; width: 330px; padding: 18px; }
.card-topline { display: flex; align-items: center; gap: 10px; }
.mini-logo { width: 34px; height: 34px; border-radius: 10px; background: linear-gradient(135deg, #0f9b63, #0b6d45); color: white; font-weight: 800; display: grid; place-items: center; font-size: 12px; }
.card-topline > div { flex: 1; }
.lock { color: var(--green-dark); font-size: 18px; }
.ballot-line { height: 1px; background: var(--line); margin: 16px 0 12px; }
.ballot-option { display: flex; align-items: center; gap: 10px; padding: 11px 8px; border-radius: 12px; margin-bottom: 8px; font-weight: 600; }
.ballot-option.selected { background: rgba(21,155,99,.08); }
.radio-check, .radio-empty { width: 18px; height: 18px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; }
.radio-check { background: var(--green); color: white; }
.radio-empty { border: 2px solid rgba(16,37,29,.24); }
.ballot-option b { margin-left: auto; color: var(--muted); }
.encrypted-row { display: flex; align-items: center; gap: 8px; margin-top: 12px; color: var(--muted); font-size: 12px; font-weight: 700; }
.floating-card { position: absolute; background: rgba(255,255,255,0.9); border: 1px solid rgba(21,155,99,.1); border-radius: 16px; padding: 12px 14px; display: flex; align-items: center; gap: 10px; box-shadow: var(--shadow); animation: float 4.8s ease-in-out infinite; }
.live-card { left: 30px; bottom: 30px; }
.verified-card { right: 10px; top: 30px; animation-delay: 1.2s; }
@keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
.live-dot { width: 10px; height: 10px; border-radius: 50%; background: #2fe17e; box-shadow: 0 0 0 8px rgba(47,225,126,.12); }
.check-circle { width: 26px; height: 26px; border-radius: 50%; display: grid; place-items: center; background: rgba(21,155,99,.1); color: var(--green-dark); font-weight: 700; }
.stats-strip { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 18px; padding: 24px 0 10px; }
.stats-strip > div { background: rgba(255,255,255,0.7); border: 1px solid rgba(21,155,99,.08); border-radius: 16px; padding: 18px 20px; display: flex; flex-direction: column; gap: 5px; }
.stats-strip strong { font-size: 1.1rem; }
.stats-strip span { color: var(--muted); font-size: .8rem; }
.info-section, .vote-section, .security-section, .cta-section { padding-top: 60px; }
.section-heading { display: flex; align-items: end; justify-content: space-between; gap: 20px; margin-bottom: 28px; }
.section-heading h2 { margin: 8px 0 0; font-size: clamp(2rem, 3vw, 3rem); line-height: 1.05; letter-spacing: -.04em; }
.section-heading em { color: var(--green); font-style: normal; }
.section-heading p { max-width: 500px; color: var(--muted); }
.feature-grid { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 22px; }
.feature-card { background: rgba(255,255,255,0.7); border: 1px solid rgba(21,155,99,.08); border-radius: 20px; padding: 22px 18px 18px; box-shadow: 0 12px 28px rgba(9,77,46,.04); transition: transform .2s ease, box-shadow .2s ease; }
.feature-card:hover { transform: translateY(-6px); box-shadow: 0 18px 40px rgba(9,77,46,.08); }
.feature-card.featured { background: linear-gradient(180deg, rgba(21,155,99,.08), rgba(255,255,255,.86)); }
.feature-number { display: inline-flex; padding: 6px 9px; background: rgba(21,155,99,.1); border-radius: 999px; font-weight: 700; color: var(--green-dark); font-size: 10px; letter-spacing: .1em; }
.feature-icon { width: 48px; height: 48px; border-radius: 16px; display: grid; place-items: center; font-size: 20px; background: rgba(21,155,99,.08); margin: 18px 0 12px; font-weight: 800; color: var(--green-dark); }
.feature-card h3 { margin: 0 0 10px; }
.feature-card p { color: var(--muted); margin: 0 0 14px; }
.feature-card a { color: var(--green-dark); font-size: 11px; font-weight: 700; }
.vote-section .section-heading.compact { align-items: center; }
.election-status { display: inline-flex; align-items: center; gap: 8px; color: var(--ink); font-weight: 700; background: rgba(21,155,99,.08); padding: 12px 16px; border-radius: 999px; }
.election-status small { color: var(--muted); margin-left: 6px; }
.ballot-panel { background: rgba(255,255,255,.8); border: 1px solid rgba(21,155,99,.08); border-radius: 22px; box-shadow: var(--shadow); padding: 22px; }
.ballot-panel-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 20px; }
.ballot-panel-head h3 { margin: 0; }
.ballot-panel-head p { margin: 6px 0 0; color: var(--muted); }
.step-label { align-self: flex-start; padding: 8px 10px; border-radius: 999px; background: rgba(21,155,99,.08); color: var(--green-dark); font-size: 11px; font-weight: 800; letter-spacing: .14em; }
.step-label b { font-weight: 800; }
.candidate-grid { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 18px; }
.candidate-card { position: relative; display: flex; align-items: center; gap: 12px; width: 100%; padding: 18px 16px; border: 1px solid #dfeae5; border-radius: 18px; background: linear-gradient(180deg, rgba(255,255,255,.96), rgba(245,255,249,.9)); text-align: left; cursor: pointer; transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease; }
.candidate-card:hover { transform: translateY(-4px); box-shadow: 0 18px 40px rgba(9,77,46,.08); }
.candidate-card.selected { border-color: rgba(21,155,99,.3); box-shadow: 0 16px 32px rgba(21,155,99,.12); }
.candidate-avatar { width: 52px; height: 52px; border-radius: 14px; object-fit: cover; box-shadow: 0 10px 18px rgba(21,155,99,.12); }
.candidate-details { display: flex; flex-direction: column; gap: 2px; flex: 1; }
.candidate-details strong { font-size: 1rem; }
.candidate-details small { color: var(--muted); }
.candidate-meta { font-size: 12px; color: var(--green-dark); font-weight: 700; margin-right: 10px; }
.candidate-meta.is-private {
  color: var(--muted);
  background: rgba(16, 37, 29, 0.05);
  border-radius: 999px;
  padding: 6px 8px;
  font-size: 10px;
}
.candidate-radio { width: 22px; height: 22px; border-radius: 50%; border: 2px solid rgba(16,37,29,.24); position: relative; }
.candidate-card.selected .candidate-radio { border-color: var(--green); }
.candidate-card.selected .candidate-radio::after { content: ''; position: absolute; inset: 4px; border-radius: 50%; background: var(--green); }
.ballot-footer { margin-top: 24px; display: flex; align-items: center; justify-content: space-between; gap: 12px; padding-top: 18px; border-top: 1px solid var(--line); }
.privacy-note { color: var(--muted); font-size: 12px; font-weight: 600; }
.security-section { display: grid; grid-template-columns: .9fr 1.1fr; gap: 28px; align-items: center; }
.security-copy h2 { margin: 8px 0 12px; font-size: clamp(2rem,3vw,3rem); letter-spacing: -.04em; line-height: 1.05; }
.security-copy p { color: var(--muted); }
.security-list { display: grid; gap: 16px; }
.security-item { display: flex; align-items: center; gap: 14px; background: rgba(255,255,255,.75); border: 1px solid rgba(21,155,99,.07); border-radius: 18px; padding: 16px 18px; }
.security-list-icon { width: 42px; height: 42px; border-radius: 14px; display: grid; place-items: center; color: var(--green-dark); background: rgba(21,155,99,.08); font-weight: 800; }
.security-item > div { flex: 1; }
.security-item strong { display: block; }
.security-item p { margin: 3px 0 0; color: var(--muted); }
.security-check { color: var(--green-dark); background: rgba(21,155,99,.08); border-radius: 50%; width: 30px; height: 30px; display: grid; place-items: center; font-weight: 800; }
.cta-section { display: flex; align-items: center; justify-content: space-between; gap: 18px; margin-bottom: 70px; padding-top: 72px; }
.cta-section h2 { margin: 8px 0 0; font-size: clamp(2.2rem,3vw,3.2rem); letter-spacing: -.05em; line-height: 1.05; }
.site-footer { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 34px 0 52px; border-top: 1px solid rgba(21,155,99,.06); }
.footer-brand { display: flex; flex-direction: column; gap: 8px; }
.footer-brand p { margin: 0; color: var(--muted); }
.footer-links { display: flex; gap: 18px; flex-wrap: wrap; }
.footer-links a, .copyright { color: var(--muted); font-size: 12px; }
.modal-backdrop { position: fixed; inset: 0; background: rgba(6,20,15,.42); backdrop-filter: blur(8px); display: grid; place-items: center; opacity: 0; visibility: hidden; transition: .25s ease; z-index: 1000; }
.modal-backdrop.open { opacity: 1; visibility: visible; }
.modal { width: min(520px, calc(100% - 28px)); background: linear-gradient(180deg, rgba(255,255,255,.98), rgba(255,255,255,.96)); border-radius: 24px; padding: 22px; position: relative; box-shadow: 0 24px 60px rgba(6,24,18,.22); transform: translateY(20px) scale(.98); transition: transform .24s ease; }
.modal-backdrop.open .modal { transform: translateY(0) scale(1); }
.modal-close { position: absolute; right: 14px; top: 10px; width: 38px; height: 38px; border: 0; background: rgba(21,155,99,.08); border-radius: 50%; color: var(--ink); font-size: 23px; cursor: pointer; }
.modal-icon { width: 56px; height: 56px; border-radius: 18px; display: grid; place-items: center; background: linear-gradient(135deg, rgba(21,155,99,.12), rgba(21,155,99,.2)); color: var(--green-dark); font-size: 30px; margin: 12px 0 10px; }
.modal h2 { margin: 10px 0 10px; }
.modal p { color: var(--muted); margin: 0; }
.encryption-status { display: flex; align-items: center; gap: 12px; background: rgba(21,155,99,.04); border-radius: 16px; padding: 12px 14px; margin-top: 18px; }
.spinner-check { width: 32px; height: 32px; border-radius: 10px; background: linear-gradient(135deg, var(--green), var(--green-dark)); color: white; display: grid; place-items: center; font-weight: 800; }
.status-online { margin-left: auto; border-radius: 999px; padding: 6px 8px; font-size: 10px; font-weight: 800; letter-spacing: .12em; color: var(--green-dark); background: rgba(21,155,99,.1); }
.security-score-box { margin-top: 14px; background: rgba(16,37,29,.02); border: 1px solid rgba(21,155,99,.08); border-radius: 14px; padding: 12px 14px; }
.security-score-head { display: flex; align-items: center; justify-content: space-between; color: var(--muted); font-size: 12px; margin-bottom: 8px; }
.security-score-head strong { color: var(--green-dark); font-size: 14px; }
.security-score-bar { height: 9px; border-radius: 999px; overflow: hidden; background: rgba(21,155,99,.08); }
.security-score-bar span { display: block; width: 0; height: 100%; border-radius: inherit; background: linear-gradient(90deg, #22c55e, #16a34a); transition: width .35s ease; }
.modal-actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 18px; }
.toast { position: fixed; right: 20px; bottom: 20px; background: linear-gradient(90deg, #0f3d2a, #157a4a); color: white; padding: 12px 16px; border-radius: 12px; display: flex; gap: 12px; align-items: center; transform: translateY(18px) scale(.98); opacity: 0; pointer-events: none; transition: .25s ease; box-shadow: 0 18px 30px rgba(15,61,42,.3); z-index: 1100; }
.toast.show { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }
.toast small { display: block; color: rgba(255,255,255,.84); }
.app-loader { position: fixed; inset: 0; display: grid; place-items: center; background: radial-gradient(circle at top, rgba(20,130,90,.26), rgba(6,24,18,.9)); backdrop-filter: blur(10px); z-index: 1200; transition: opacity .5s ease; }
.app-loader[hidden] { display: none; }
.loader-orb { position: absolute; width: 220px; height: 220px; border-radius: 50%; background: rgba(163,235,193,.12); filter: blur(12px); }
.loader-ring { position: absolute; width: 150px; height: 150px; border-radius: 50%; border: 3px solid rgba(255,255,255,.18); border-top-color: rgba(144,255,198,.9); animation: spin 1.5s linear infinite; }
.ring-two { width: 190px; height: 190px; animation-direction: reverse; border-bottom-color: rgba(82,214,144,.8); }
.loader-text { display: flex; flex-direction: column; align-items: center; gap: 2px; color: white; z-index: 1; }
.loader-text span, .loader-text strong { font-family: 'Space Grotesk', sans-serif; font-size: clamp(1.8rem,3vw,3rem); }
.loader-text small { color: rgba(255,255,255,.75); letter-spacing: .2em; text-transform: uppercase; font-size: 10px; }
.auth-overlay { position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; background: var(--overlay); backdrop-filter: blur(8px); z-index: 60; transition: opacity .28s ease; }
.auth-overlay[hidden] { display: none; }
.auth-card { width: 440px; max-width: calc(100% - 48px); background: linear-gradient(180deg, rgba(255,255,255,.98), #fff); border-radius: 20px; padding: 22px; box-shadow: 0 20px 40px rgba(8,40,24,.14); border: 1px solid rgba(9,36,25,.04); position: relative; overflow: hidden; }
.auth-card::before { content: ''; position: absolute; inset: 0 auto auto -10%; width: 180px; height: 180px; background: radial-gradient(circle, rgba(21,155,99,.14), transparent 70%); pointer-events: none; }
.auth-head h2 { margin: 0 0 6px; font-size: 20px; color: var(--ink); }
.auth-head p { margin: 0 0 12px; color: var(--muted); font-size: 13px; }
.auth-tabs { display: flex; gap: 8px; margin-bottom: 12px; }
.auth-tabs .button { padding: 8px 12px; border-radius: 10px; font-size: 13px; }
.auth-forms { margin-top: 6px; }
.auth-panel { width: 100%; overflow: hidden; }
.auth-form { display: none; flex-direction: column; gap: 12px; }
.auth-form.active { display: flex; }
.auth-form .field { display: flex; flex-direction: column; position: relative; }
.auth-form .field-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.auth-form label { font-size: 13px; color: var(--muted); margin-bottom: 6px; }
.auth-form input { width: 100%; padding: 12px 14px; border-radius: 12px; border: 1px solid var(--line); background: rgba(255,255,255,0.6); color: #111827; transition: border-color .2s ease, box-shadow .2s ease, transform .2s ease; }
.auth-form input::placeholder { color: rgba(17,24,39,0.5); }
.auth-form input:focus { outline: none; border-color: var(--green); box-shadow: 0 6px 18px rgba(21,150,99,.08); transform: translateY(-1px); }
.password-field input { padding-right: 42px; }
.password-toggle { position: absolute; right: 10px; top: 40px; border: 0; background: transparent; font-size: 16px; padding: 6px; cursor: pointer; }
.auth-row, .auth-actions, .auth-foot { display: flex; justify-content: space-between; align-items: center; }
.auth-row { margin-top: 2px; }
.check-row { display: inline-flex; align-items: center; gap: 8px; color: var(--muted); font-size: 12px; }
.check-row input { width: 15px; height: 15px; accent-color: var(--green); }
.mini-link { font-size: 12px; }
.strength-meter { display: grid; gap: 8px; }
.strength-labels { display: flex; justify-content: space-between; font-size: 11px; color: var(--muted); }
.strength-labels strong { color: var(--green-dark); }
.strength-bar { height: 8px; border-radius: 999px; background: rgba(21,155,99,.08); overflow: hidden; }
.strength-bar span { display: block; height: 100%; width: 0; border-radius: inherit; background: linear-gradient(90deg, #ef4444, #f59e0b, #22c55e); transition: width .25s ease; }
.auth-actions { justify-content: flex-end; margin-top: 8px; }
.consent-row { margin-top: 2px; align-items: flex-start; }
.auth-foot { justify-content: flex-end; margin-top: 12px; }
.text-link { background: none; padding: 0; border: 0; cursor: pointer; color: var(--green-dark); }
.header-user { display: flex; align-items: center; }
.profile-btn { width: 42px; height: 42px; border: 0; background: transparent; padding: 0; border-radius: 50%; overflow: hidden; cursor: pointer; box-shadow: 0 8px 18px rgba(21,155,99,.12); }
.profile-btn img { width: 42px; height: 42px; object-fit: cover; border-radius: 50%; }
.profile-modal .modal { width: min(460px, calc(100% - 28px)); }
.profile-header { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; }
.profile-avatar-wrap { width: 72px; height: 72px; border-radius: 20px; overflow: hidden; border: 2px solid rgba(21,155,99,.14); }
.profile-avatar-wrap img { width: 100%; height: 100%; object-fit: cover; }
.profile-badge { display: inline-flex; background: rgba(21,155,99,.08); color: var(--green-dark); border-radius: 999px; padding: 6px 10px; font-weight: 700; font-size: 10px; letter-spacing: .12em; text-transform: uppercase; }
.profile-meta { margin-bottom: 18px; }
.profile-meta p { margin-top: 10px; color: var(--muted); }
.profile-field { display: flex; flex-direction: column; gap: 8px; margin-bottom: 18px; }
.profile-field span { color: var(--muted); font-size: 13px; }
.profile-field input { border: 1px solid var(--line); border-radius: 12px; padding: 12px 14px; }
.profile-actions { display: flex; justify-content: flex-end; gap: 10px; flex-wrap: wrap; }
.empty-note { color: var(--muted); padding: 14px 12px; border: 1px dashed rgba(21,155,99,.14); background: rgba(21,155,99,.03); border-radius: 10px; text-align: center; }
.reveal { opacity: 0; transform: translateY(18px); transition: opacity .7s ease, transform .7s ease; }
.reveal.is-visible { opacity: 1; transform: translateY(0); }
.count-up { display: inline-block; }
.mobile-menu-toggle { display: none; width: 44px; height: 44px; background: rgba(21,155,99,.08); border: 0; border-radius: 12px; padding: 9px; cursor: pointer; }
.mobile-menu-toggle span { display: block; width: 100%; height: 2px; background: var(--ink); border-radius: 999px; margin: 5px 0; transition: transform .28s ease, opacity .2s ease; }
.mobile-menu-toggle.is-open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.mobile-menu-toggle.is-open span:nth-child(2) { opacity: 0; }
.mobile-menu-toggle.is-open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
.mobile-nav-panel { display: none; }
.hide-mobile { display: inline-flex; }
@media (max-width: 1080px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 28px;
    padding-top: 36px;
  }
  .hero-copy {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .hero-actions, .trust-row { justify-content: center; }
  .hero-text { max-width: 680px; }
  .security-section { grid-template-columns: 1fr; }
  .site-footer { flex-wrap: wrap; }
}

@media (max-width: 920px) {
  .main-nav, .hide-mobile { display: none; }
  .mobile-menu-toggle { display: block; }
  .mobile-nav-panel {
    display: none;
    flex-direction: column;
    gap: 12px;
    padding: 12px 0 0;
    width: 100%;
    background: rgba(255,255,255,0.75);
    border: 1px solid rgba(21,155,99,0.08);
    border-radius: 18px;
    margin-top: 12px;
    padding: 14px;
  }
  body.dark .mobile-nav-panel {
    background: rgba(8,24,19,0.82);
    border-color: rgba(21,155,99,0.14);
  }
  .mobile-nav-panel.open { display: flex; }
  .mobile-nav-panel .button, .mobile-nav-panel .nav-link { width: 100%; }
  .site-header {
    height: auto;
    padding: 16px 0;
    flex-wrap: wrap;
    position: sticky;
  }
  .feature-grid, .candidate-grid, .stats-strip { grid-template-columns: 1fr; }
  .section-heading, .ballot-panel-head, .ballot-footer, .cta-section, .site-footer, .security-section { display: block; }
  .section-heading { margin-bottom: 20px; }
  .hero-visual {
    height: 430px;
    width: 100%;
    max-width: 480px;
    margin: 0 auto;
  }
  .shield-card { left: 18px; top: 32px; width: 210px; }
  .ballot-card { right: 18px; bottom: 24px; width: 280px; }
  .floating-card { transform: scale(.92); }
}

@media (max-width: 700px) {
  .stats-strip { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .section-container, .site-header, .site-footer { width: min(100% - 24px, 1160px); }
  .hero-copy h1 { font-size: clamp(2.5rem, 9vw, 4rem); }
  .hero-actions { flex-direction: column; align-items: stretch; width: 100%; }
  .hero-actions .button, .hero-actions .text-link { width: 100%; justify-content: center; }
  .trust-row { display: flex; flex-wrap: wrap; gap: 12px; }
  .section-heading h2, .security-copy h2, .cta-section h2 { line-height: 1.06; }
}

@media (max-width: 520px) {
  .site-header, .section-container, .site-footer { width: min(100% - 24px, 1160px); }
  .hero { padding-top: 24px; }
  .hero-copy h1 { font-size: clamp(2.2rem, 10vw, 3.1rem); }
  .hero-actions { flex-direction: column; align-items: stretch; }
  .hero-actions .button, .hero-actions .text-link { width: 100%; justify-content: center; }
  .trust-row { display: grid; gap: 12px; }
  .trust-divider { display: none; }
  .stats-strip { grid-template-columns: 1fr; }
  .auth-card { padding: 16px; }
  .auth-form .field-grid { grid-template-columns: 1fr; }
  .candidate-card { flex-wrap: wrap; align-items: center; }
  .candidate-details { min-width: 0; }
  .ballot-footer { display: block; }
  .ballot-footer .button { width: 100%; margin-top: 12px; }
  .mobile-nav-panel .button { width: 100%; }
  .site-footer { display: grid; gap: 16px; }
  .footer-links { justify-content: space-between; }
  .cta-section { text-align: center; }
  .hero-visual {
    height: 360px;
    max-width: 100%;
  }
  .shield-card {
    width: 180px;
    padding: 12px;
    left: 8px;
    top: 18px;
    gap: 8px;
  }
  .ballot-card {
    right: 8px;
    bottom: 18px;
    width: 240px;
    padding: 14px;
  }
  .floating-card {
    font-size: 12px;
    left: 12px;
    right: auto;
    bottom: 12px;
  }
  .verified-card { right: 12px; left: auto; top: 12px; }
}

@media (max-width: 390px) {
  .brand span { font-size: 18px; }
  .header-actions { gap: 8px; }
  .icon-button { font-size: 20px; }
  .hero-copy h1 { letter-spacing: -0.05em; }
  .shield-card { width: 160px; }
  .ballot-card { width: 210px; }
  .floating-card { transform: scale(0.84); }
  .auth-card { max-width: calc(100% - 20px); }
  .turnout-meta { flex-direction: column; }
  .turnout-meta small:last-child { text-align: left; }
}
```

---

## admin.html

Purpose: This is the admin dashboard page. It shows election statistics, live results, voters, candidates, and recent activity for the election manager.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; img-src 'self' data: https: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.gstatic.com https://www.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; connect-src 'self' https://www.gstatic.com https://*.firebaseapp.com https://*.googleapis.com https://*.firebaseio.com wss://*.firebaseio.com; upgrade-insecure-requests;" />
  <meta name="referrer" content="strict-origin-when-cross-origin" />
  <meta name="color-scheme" content="light dark" />
  <meta name="theme-color" content="#071617" />
  <title>Admin Dashboard — Vote Safe</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="assets/admin.css" />
</head>
<body>
  <div class="admin-shell">
    <header class="admin-header">
      <div class="brand-wrap">
        <img src="assets/logo.svg" alt="Vote Safe" />
        <div>
          <span class="eyebrow">Secure admin access</span>
          <h1>Admin dashboard</h1>
        </div>
      </div>

      <div class="admin-actions">
        <a class="button button-outline" href="index.html">Back to site</a>
        <button id="signOutAdmin" class="button button-primary">Sign out</button>
      </div>
    </header>

    <main class="admin-main">
      <section class="top-stats">
        <div class="stat-card accent">
          <span class="stat-label">Total votes</span>
          <strong id="totalVotes">0</strong>
        </div>
        <div class="stat-card">
          <span class="stat-label">Registered users</span>
          <strong id="totalUsers">0</strong>
        </div>
        <div class="stat-card">
          <span class="stat-label">Candidates</span>
          <strong id="totalCandidates">0</strong>
        </div>
        <div class="stat-card">
          <span class="stat-label">Leader</span>
          <strong id="winnerName">—</strong>
        </div>
      </section>

      <section class="dashboard-grid">
        <div class="panel large-panel">
          <div class="panel-head">
            <h2>Live voting report</h2>
            <span class="pill success">Live</span>
          </div>
          <div id="candidateBreakdown" class="candidate-breakdown"></div>
        </div>

        <div class="panel">
          <div class="panel-head">
            <h2>Recent activity</h2>
          </div>
          <div id="liveActivity" class="activity-list"></div>
        </div>
      </section>

      <section class="dashboard-grid lower-grid">
        <div class="panel">
          <div class="panel-head">
            <h2>Manage candidates</h2>
          </div>

          <form id="addCandidateForm" class="candidate-form">
            <input id="candidateName" type="text" placeholder="Candidate name" required />
            <input id="candidateParty" type="text" placeholder="Party or affiliation" required />
            <input id="candidateImage" type="text" placeholder="Image URL (optional)" />
            <button type="submit" class="button button-primary">Add candidate</button>
          </form>

          <div id="candidateList" class="candidate-list"></div>
        </div>

        <div class="panel">
          <div class="panel-head">
            <h2>All voters</h2>
          </div>
          <div id="userList" class="voter-list"></div>
        </div>
      </section>
    </main>
  </div>

  <script src="https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.22.1/firebase-auth-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore-compat.js"></script>
  <script src="admin.js"></script>
</body>
</html>
```

---

## admin.js

Purpose: This file connects the admin page to Firebase and loads real voting data. It calculates totals, shows winners, tracks recent events, and displays all candidates and voters.

```javascript
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
const candidateImage = document.getElementById('candidateImage');
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
    const imageUrl = candidateImage ? candidateImage.value.trim() : '';

    if (!name || !party) return;

    await db.collection('candidates').add({
      name,
      party,
      imageUrl: imageUrl || null,
      order: Date.now()
    });

    candidateName.value = '';
    candidateParty.value = '';
    if (candidateImage) candidateImage.value = '';
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

  let isAdmin = false;
  try {
    isAdmin = !!user.email && user.email.toLowerCase() === adminEmail.toLowerCase();
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
```

---

## profile.html

Purpose: This page allows the logged-in user to view and update their profile, change their display name, and sign out of the system.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Profile — Vote Safe</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="style.css" />
  <link rel="stylesheet" href="assets/auth.css" />
</head>
<body>
  <header class="site-header" style="position:static">
    <a class="brand" href="index.html" aria-label="Vote Safe home">
      <img src="assets/logo.svg" alt="Vote Safe logo" class="brand-logo" />
      <span>Vote<span class="brand-accent">Safe</span></span>
    </a>
    <nav class="main-nav">
      <a class="nav-link" href="index.html">Back to site</a>
    </nav>
  </header>

  <main class="section-container" style="max-width:720px;margin:36px auto">
    <div class="profile-page card">
      <div style="display:flex;gap:18px;align-items:center">
        <div style="width:120px;height:120px;border-radius:18px;overflow:hidden;flex:0 0 120px;background:#f3f4f6">
          <img id="profileAvatar" src="" alt="profile avatar" style="width:100%;height:100%;object-fit:cover" />
        </div>
        <div>
          <div class="eyebrow">Profile</div>
          <h1 id="profileTitle">Your account</h1>
          <p id="profileEmail">—</p>
        </div>
      </div>

      <div style="margin-top:20px">
        <label class="profile-field" style="display:block">
          <span>Display name</span>
          <input id="profileDisplayName" type="text" placeholder="Your full name" />
        </label>

        <div class="profile-actions" style="margin-top:18px">
          <button id="saveProfile" class="button button-primary">Save profile</button>
          <button id="logoutBtn" class="button button-danger">Sign out</button>
        </div>
      </div>

      <p style="margin-top:18px;color:#6b7280">Your avatar is generated for privacy — change your display name to refresh it.</p>
    </div>
  </main>

  <script src="https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.22.1/firebase-auth-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.22.1/firebase-functions-compat.js"></script>
  <script src="script.js"></script>
  <script>
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        window.location.href = 'index.html';
        return;
      }
      updateHeader(user);
    });
  </script>
</body>
</html>
```

---

## assets/auth.css

Purpose: This stylesheet handles the authentication popup, sign-in/sign-up forms, password visibility toggles, and login form styling.

```css
/* Auth form modern styles and button animations */
.auth-overlay{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:linear-gradient(180deg,rgba(6,28,18,.35),rgba(6,28,18,.5));backdrop-filter:blur(6px);z-index:60;transition:opacity .28s ease}
.auth-overlay[hidden]{display:none}
.auth-card{width:440px;max-width:calc(100% - 48px);background:linear-gradient(180deg,rgba(255,255,255,0.98),#fff);border-radius:14px;padding:22px;box-shadow:0 20px 40px rgba(8,40,24,.14);border:1px solid rgba(9,36,25,.04);position:relative;overflow:hidden}
.auth-head h2{margin:0 0 6px;font-size:20px}
.auth-head p{margin:0 0 12px;color:var(--muted);font-size:13px}
.auth-tabs{display:flex;gap:8px;margin-bottom:12px}
.auth-tabs .button{padding:8px 12px;border-radius:10px;font-size:13px}
.auth-forms{margin-top:6px}
.auth-form{display:flex;flex-direction:column;gap:12px}
.auth-form .field{display:flex;flex-direction:column}
.auth-form label{font-size:13px;color:var(--muted);margin-bottom:6px}
.auth-form input{padding:10px 12px;border-radius:10px;border:1px solid var(--line);font-size:14px;background:transparent}
.auth-form input:focus{outline:none;border-color:var(--green);box-shadow:0 6px 18px rgba(21,150,99,.08)}

/* Slider layout for forms */
.forms-viewport{overflow:hidden}
.forms-slider{display:flex;gap:18px;transition:transform .38s cubic-bezier(.2,.9,.2,1);width:200%}
.forms-slider .auth-form{width:50%;min-width:300px;padding:6px 0}

.auth-card.show-signup .forms-slider{transform:translateX(-50%)}

/* password toggle */
.password-field{position:relative}
.password-toggle{position:absolute;right:10px;top:36px;border:0;background:transparent;font-size:16px;padding:6px;cursor:pointer}

/* Responsive constraints and scroll */
.auth-card{max-height:80vh;overflow:auto}
@media (max-width:520px){
	.auth-card{width:calc(100% - 24px);border-radius:12px;padding:16px;margin:12px;height:100vh;max-height:100vh;align-self:flex-start}
	.forms-slider{width:200%;gap:12px}
	.forms-slider .auth-form{width:100%}
	.auth-card .auth-head h2{font-size:18px}
}

/* Animated primary button */
.button-primary{background:linear-gradient(90deg,var(--green),var(--green-dark));color:var(--white)}
.button-primary:focus{box-shadow:0 8px 28px rgba(21,150,99,.18)}
.button-animated{position:relative;overflow:hidden}
.button-animated::after{content:'';position:absolute;inset:0;background:linear-gradient(120deg,rgba(255,255,255,0.12),rgba(255,255,255,0));transform:translateX(-100%);transition:transform .6s cubic-bezier(.2,.9,.2,1)}
.button-animated:hover::after{transform:translateX(0)}

/* loading spinner for buttons */
.button{position:relative}
.button.loading{pointer-events:none;opacity:.95}
.button.loading::after{content:'';position:absolute;right:12px;top:50%;transform:translateY(-50%);width:16px;height:16px;border-radius:50%;border:2px solid rgba(255,255,255,.28);border-top-color:rgba(255,255,255,0.92);animation:spin .9s linear infinite}
@keyframes spin{to{transform:translateY(-50%) rotate(360deg)}}

/* subtle open/close animation for the card */
.auth-card.fade-out{animation:cardOut .36s forwards}
@keyframes cardOut{to{opacity:0;transform:translateY(-12px) scale(.985)}}

/* small polish for active tab */
.auth-tabs .button.active{background:rgba(21,150,99,.08);border-color:rgba(21,150,99,.12)}

/* toast tweaks for success messages */
.toast{position:fixed;right:20px;bottom:20px;background:linear-gradient(90deg,#0f3d2a,#157a4a);color:white;padding:12px 16px;border-radius:12px;display:flex;gap:12px;align-items:center;transform:translateY(16px) scale(.98);opacity:0;pointer-events:none;transition:opacity .25s,transform .25s}
.toast.show{opacity:1;transform:translateY(0) scale(1);pointer-events:auto}
.toast small{display:block;color:rgba(255,255,255,.85);font-weight:500}

/* subtle form close animation */
.auth-card.fade-out{animation:cardOut .36s forwards}
@keyframes cardOut{to{opacity:0;transform:translateY(-12px) scale(.98)}}
```

---

## assets/admin.css

Purpose: This is the styling file specifically for the admin dashboard. It gives the admin panel a clean reporting layout and chart-like visual design.

```css
:root {
  --admin-bg: #071617;
  --panel-bg: rgba(255, 255, 255, 0.92);
  --panel-border: rgba(21, 155, 99, 0.08);
  --accent: #29c77d;
  --accent-dark: #0d774b;
  --muted: #6d8b80;
  --text: #0a2019;
  --card-soft: #f5fff9;
  --shadow: 0 18px 35px rgba(5, 43, 31, 0.12);
}

* { box-sizing: border-box; }
html, body { margin: 0; min-height: 100%; }
body {
  font-family: 'Inter', Arial, sans-serif;
  background: linear-gradient(180deg, #f4fff9 0%, #ecfff4 100%);
  color: var(--text);
}

img { max-width: 100%; display: block; }
button, input { font: inherit; }

a { text-decoration: none; }

.admin-shell { min-height: 100vh; }
.admin-header {
  display: flex; justify-content: space-between; align-items: center; gap: 16px;
  padding: 18px 28px;
  background: linear-gradient(90deg, #07251d, #0a3a2d 58%, #0f583f 100%);
  color: white;
}
.brand-wrap {
  display: flex; align-items: center; gap: 14px;
}
.brand-wrap img { height: 42px; }
.brand-wrap h1 { margin: 4px 0 0; font-size: clamp(1.5rem, 2.2vw, 2.2rem); }
.eyebrow { display: block; color: rgba(255,255,255,0.72); font-size: 10px; text-transform: uppercase; letter-spacing: 0.14em; }
.admin-actions { display: flex; gap: 12px; align-items: center; }

.button {
  border: 0; border-radius: 12px; padding: 11px 16px; cursor: pointer; font-weight: 700; transition: transform 0.2s ease;
}
.button:hover { transform: translateY(-2px); }
.button.button-primary { background: linear-gradient(120deg, var(--accent), var(--accent-dark)); color: white; }
.button.button-outline { background: rgba(255,255,255,0.08); color: white; border: 1px solid rgba(255,255,255,0.18); }

.admin-main {
  max-width: 1200px; margin: 0 auto; padding: 28px 20px 42px;
}
.top-stats {
  display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 18px; margin-bottom: 24px;
}
.stat-card {
  background: var(--panel-bg); border: 1px solid var(--panel-border); border-radius: 20px; box-shadow: var(--shadow); padding: 18px 20px;
}
.stat-card.accent { background: linear-gradient(135deg, rgba(41, 199, 125, 0.12), rgba(255,255,255,0.96)); }
.stat-label { display: block; color: var(--muted); font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em; }
.stat-card strong {
  display: block; margin-top: 8px; font-size: clamp(1.9rem, 3vw, 2.5rem); letter-spacing: -0.04em;
}

.dashboard-grid {
  display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 20px; margin-top: 20px;
}
.lower-grid { margin-top: 22px; }
.panel {
  background: var(--panel-bg); border: 1px solid var(--panel-border); border-radius: 22px; box-shadow: var(--shadow); padding: 18px 18px 14px;
}
.large-panel { min-height: 370px; }
.panel-head {
  display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 14px;
}
.panel-head h2 { margin: 0; font-size: 1.1rem; }
.pill {
  display: inline-flex; align-items: center; padding: 5px 9px; border-radius: 999px; font-size: 10px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 700;
}
.pill.success { background: rgba(41, 199, 125, 0.12); color: #0d774b; }

.candidate-breakdown { display: grid; gap: 14px; }
.chart-row { display: grid; gap: 8px; }
.chart-label-row {
  display: flex; align-items: center; justify-content: space-between; gap: 12px; font-size: 14px; font-weight: 600;
}
.bar-track {
  width: 100%; height: 14px; background: #ebfaf2; border-radius: 999px; overflow: hidden;
  position: relative;
}
.bar-fill {
  position: relative;
  height: 100%; border-radius: inherit;
  background: linear-gradient(90deg, #39d58a 0%, #13b26c 46%, #0a7149 100%);
  box-shadow: inset 0 0 8px rgba(255,255,255,0.3);
  overflow: hidden;
  animation: waterPulse 3s ease-in-out infinite alternate;
}
.bar-fill::before {
  content: "";
  position: absolute;
  inset: -18% -12% 0 -12%;
  background: linear-gradient(90deg, rgba(255,255,255,0.05), rgba(255,255,255,0.32), rgba(255,255,255,0.06));
  transform: translateX(-18%) skewX(-16deg);
  animation: waterShift 2.8s ease-in-out infinite alternate;
}
.bar-fill::after {
  content: "";
  position: absolute;
  width: 18px;
  height: 18px;
  right: 12%;
  top: 50%;
  border-radius: 50%;
  background: rgba(255,255,255,0.34);
  box-shadow: -28px -8px 0 rgba(255,255,255,0.18), -64px 12px 0 rgba(255,255,255,0.14), -94px -18px 0 rgba(255,255,255,0.12);
  transform: translateY(-50%);
  animation: bubbleDrift 3.2s ease-in-out infinite;
}
@keyframes waterShift {
  0% { transform: translateX(-22%) skewX(-18deg); }
  100% { transform: translateX(14%) skewX(-18deg); }
}
@keyframes bubbleDrift {
  0% { transform: translateY(-50%) scale(0.8); opacity: 0.65; }
  50% { transform: translateY(-62%) scale(1.06); opacity: 1; }
  100% { transform: translateY(-42%) scale(0.92); opacity: 0.7; }
}
@keyframes waterPulse {
  0% { filter: saturate(0.9) brightness(0.96); }
  100% { filter: saturate(1.2) brightness(1.08); }
}

.activity-list, .candidate-list, .voter-list { display: grid; gap: 12px; }
.activity-item, .candidate-row, .user-row {
  display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: 12px; background: rgba(245,255,249,0.8); border: 1px solid rgba(21,155,99,0.04);
}
.activity-item .dot {
  width: 10px; height: 10px; border-radius: 50%; background: #2ed088; box-shadow: 0 0 0 8px rgba(46,208,136,0.14);
}
.activity-item > div, .candidate-row > div, .user-row > div { flex: 1; }
.activity-item strong, .candidate-row strong, .user-row strong { display: block; }
.activity-item small, .candidate-row small, .user-row small { color: var(--muted); }

.candidate-form {
  display: grid; grid-template-columns: 1fr 1fr auto; gap: 10px; margin-bottom: 16px;
}
.candidate-form input {
  width: 100%; border-radius: 10px; border: 1px solid rgba(21,155,99,0.16); padding: 12px 14px; background: rgba(245,255,249,0.7);
}

.candidate-row span {
  background: rgba(41, 199, 125, 0.1); color: #0d774b; border-radius: 999px; padding: 6px 10px; font-size: 11px; font-weight: 800;
}
.avatar-mini {
  width: 38px; height: 38px; border-radius: 12px; display: grid; place-items: center; font-size: 11px; font-weight: 800; color: #0d774b; background: linear-gradient(135deg, rgba(41,199,125,0.12), rgba(41,199,125,0.22));
}

.empty-note {
  padding: 16px; border: 1px dashed rgba(21,155,99,0.14); background: rgba(21,155,99,0.03); color: var(--muted); border-radius: 12px; text-align: center;
}

@media (max-width: 880px) {
  .top-stats, .dashboard-grid { grid-template-columns: 1fr 1fr; }
  .candidate-form { grid-template-columns: 1fr; }
}

@media (max-width: 560px) {
  .admin-header { padding: 16px 18px; flex-direction: column; align-items: flex-start; }
  .admin-actions { width: 100%; justify-content: space-between; }
  .top-stats, .dashboard-grid { grid-template-columns: 1fr; }
}
```

---

## assets/extra.css

Purpose: This file contains extra visual enhancements such as card styling and avatar layout adjustments for a more polished interface.

```css
/* VoteSafe: extra styles for images and avatars */
.brand-logo{height:40px;width:auto;display:inline-block;border-radius:8px}
.candidate-avatar-img{width:56px;height:56px;border-radius:10px;object-fit:cover;margin-right:12px;flex-shrink:0}
.candidate-card{display:flex;align-items:center;gap:12px;padding:12px;border-radius:12px;border:1px solid rgba(0,0,0,0.04);background:linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,255,255,0.96));transition:transform .18s,box-shadow .18s}
.candidate-card:hover{transform:translateY(-6px);box-shadow:0 18px 40px rgba(9,77,46,.08)}
.candidate-card .candidate-details{display:block;text-align:left}

@media (max-width:720px){
  .candidate-avatar-img{width:44px;height:44px}
}
```

---

## assets/ui-overrides.css

Purpose: This stylesheet adds extra overrides for the auth overlay, profile modal, and special admin panel visual adjustments.

```css
:root{--overlay-bg:rgba(4,18,12,.45)}
/* Modern auth overlay and profile styles */
.auth-overlay{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:var(--overlay-bg);backdrop-filter:blur(6px);z-index:1200}
.auth-card{width:420px;background:var(--white);border-radius:14px;padding:22px;box-shadow:0 22px 55px rgba(9,77,46,.13);color:var(--ink)}
.auth-head h2{margin:0 0 6px;font-size:20px}
.auth-head p{margin:0 0 14px;color:var(--muted)}
.auth-form .field{margin-bottom:12px}
.auth-form label{display:block;font-size:13px;color:var(--muted);margin-bottom:6px}
.auth-form input{width:100%;padding:10px 12px;border-radius:10px;border:1px solid var(--line);font-size:15px}
.auth-actions{display:flex;gap:10px;justify-content:flex-end;margin-top:8px}

.header-user{display:flex;align-items:center}
.profile-btn{border:0;background:transparent;padding:0;border-radius:999px;overflow:hidden;width:42px;height:42px;display:inline-flex;align-items:center;justify-content:center;cursor:pointer}
.profile-btn img{width:100%;height:100%;object-fit:cover;display:block}

/* Profile modal */
.modal.profile-modal{width:480px;border-radius:12px;padding:20px;box-shadow:0 22px 55px rgba(9,77,46,.13);background:var(--white);}
.profile-top{display:flex;gap:14px;align-items:center;margin-bottom:16px}
.profile-avatar-large{width:72px;height:72px;border-radius:14px;object-fit:cover}
.profile-form label{display:flex;flex-direction:column;gap:8px;margin-bottom:12px}
.profile-form input[type=text]{padding:10px;border-radius:10px;border:1px solid var(--line)}
.profile-actions{display:flex;gap:10px;justify-content:flex-end}

/* Admin panel distinct styling */
.admin-panel{background:linear-gradient(180deg,rgba(5,30,20,0.03),transparent);border-radius:14px;padding:18px;margin-top:18px}
.admin-grid{display:flex;gap:18px}
.admin-column{flex:1;background:linear-gradient(180deg,#fff, #f7fff9);border-radius:12px;padding:12px;min-height:160px}
.admin-log{max-height:320px;overflow:auto}
.admin-log-item{padding:8px;border-bottom:1px dashed var(--line);font-size:13px;color:var(--muted)}

/* responsive small screens */
@media (max-width:720px){
  .auth-card{width:92%}
  .modal.profile-modal{width:92%}
  .admin-grid{flex-direction:column}
}
```

---

## backend/src/index.js

Purpose: This is the Express backend entry file. It sets up the server, exposes API routes, handles election endpoints, and connects the app to the database and admin/auth routes.

```javascript
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
 
const prisma = new PrismaClient();
// Load auth and admin routes
const authRoutes = require('./auth');
const adminRoutes = require('./admin');
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '1mb' }));

const KEYS_DIR = path.join(__dirname, '..', 'keys');
const PUB_PATH = path.join(KEYS_DIR, 'public.pem');

app.get('/api/public-key', async (req, res) => {
  try {
    if (!fs.existsSync(PUB_PATH)) return res.status(404).json({ error: 'Public key not found. Run gen:keys.' });
    const pem = fs.readFileSync(PUB_PATH, 'utf8');
    res.json({ publicKey: pem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// mount auth and admin routes
app.use('/api', authRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/elections', async (req, res) => {
  const elections = await prisma.election.findMany({ include: { candidates: true } });
  res.json(elections);
});

app.post('/api/ballot/submit', async (req, res) => {
  try {
    const { electionId, ciphertext, encKey, meta } = req.body;
    if (!electionId || !ciphertext || !encKey) return res.status(400).json({ error: 'Missing fields' });
    const ballot = await prisma.ballot.create({ data: { electionId, ciphertext, encKey, meta: meta ? JSON.stringify(meta) : null } });
    res.json({ ok: true, id: ballot.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/ballots/:electionId', async (req, res) => {
  const { electionId } = req.params;
  const ballots = await prisma.ballot.findMany({ where: { electionId: Number(electionId) } });
  res.json(ballots);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`VoteSafe backend running on http://localhost:${PORT}`));
```

---

## backend/src/auth.js

Purpose: This file handles the demo voter authentication flow. It registers users, creates OTP codes, and issues JWT tokens for secure access.

```javascript
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
```

---

## backend/src/admin.js

Purpose: This file manages admin-only security and ballot results. It checks admin permissions, decrypts ballot data, and tallies election results.

```javascript
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
      const encKeyBuf = Buffer.from(b.encKey, 'base64');
      const symmetricKey = crypto.privateDecrypt({key: privatePem, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, oaepHash:'sha256'}, encKeyBuf);
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
```

---

## backend/prisma/schema.prisma

Purpose: This file defines the database schema for elections, candidates, ballots, and voters. It is the structure that stores all voting information in PostgreSQL.

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Election {
  id        Int       @id @default(autoincrement())
  title     String
  startsAt  DateTime
  endsAt    DateTime
  publicKey String?   @db.Text
  candidates Candidate[]
  ballots   Ballot[]
}

model Candidate {
  id         Int      @id @default(autoincrement())
  election   Election @relation(fields: [electionId], references: [id])
  electionId Int
  name       String
  party      String?
  order      Int?
}

model Ballot {
  id         Int      @id @default(autoincrement())
  election   Election @relation(fields: [electionId], references: [id])
  electionId Int
  ciphertext String   @db.Text
  encKey     String   @db.Text
  submittedAt DateTime @default(now())
  meta       String?  @db.Text
}

model Voter {
  id        Int     @id @default(autoincrement())
  studentId String  @unique
  name      String?
  allowed   Boolean @default(false)
}
```

---

## functions/index.js

Purpose: This file creates the Firebase serverless function that accepts submitted votes, validates the user token, and writes the vote into Firestore safely.

```javascript
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
```

---

## README.md

Purpose: This file explains the overall project, its purpose, and how to run or deploy the Vote Safe system.

```md
# Vote Safe

Secure campus voting platform for students and staff.

## Features
- login and sign-up
- candidate voting
- admin dashboard
- Firebase integration
- secure ballot tracking

## Run locally
1. Open the project in a browser.
2. Ensure Firebase is configured.
3. Start the frontend with a static web server if needed.

## Project structure
- index.html — public voting site
- admin.html — admin dashboard
- script.js — frontend logic
- style.css — styling
- backend/ — Express + Prisma backend
```

---

## README-GH-PUSH.md

Purpose: This file gives the exact instructions used to push the project to GitHub and publish it through GitHub Pages.

```md
# Deploy VoteSafe to GitHub Pages

Follow these steps locally to push this project to your GitHub repo and trigger automatic deployment to GitHub Pages.

1. Initialize git, commit, and add remote

```bash
git init
git add .
git commit -m "Initial VoteSafe site"
git remote add origin https://github.com/yourusername/yourrepo.git
git branch -M main
git push -u origin main
```

2. The repo contains a GitHub Actions workflow that deploys the project root to the gh-pages branch.

3. Open Settings → Pages and choose the gh-pages branch.
```

---

## firebase.json

Purpose: This file configures Firebase deployment settings, including the Cloud Functions source and Firestore security rules.

```json
{
  "functions": {
    "source": "functions"
  },
  "firestore": {
    "rules": "firestore.rules"
  }
}
```

---

## firestore.rules

Purpose: This file controls who can read, write, create, update, and delete data in Firestore. It ensures only admin users can manage candidates and results.

```rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function isSignedIn() {
      return request.auth != null;
    }

    function isAdmin() {
      return isSignedIn() && request.auth.token.email == 'praise234@gmail.com';
    }

    match /candidates/{candidateId} {
      allow read: if isSignedIn();
      allow create, update, delete: if isAdmin();
    }

    match /votes/{uid} {
      allow create: if isSignedIn()
        && request.auth.uid == uid
        && request.resource.data.uid == uid
        && request.resource.data.email == request.auth.token.email
        && request.resource.data.candidate is string
        && request.resource.data.keys().hasOnly(['uid', 'email', 'candidate', 'timestamp'])
        && !exists(/databases/$(database)/documents/votes/$(uid));

      allow read: if isSignedIn() && (isAdmin() || request.auth.uid == uid);
      allow update, delete: if isAdmin();
    }

    match /users/{userId} {
      allow create: if isSignedIn()
        && request.auth.uid == userId
        && request.resource.data.email == request.auth.token.email;

      allow get, list: if isSignedIn() && (isAdmin() || request.auth.uid == userId);
      allow update: if isSignedIn() && request.auth.uid == userId;
      allow delete: if isAdmin();
    }

    match /events/{eventId} {
      allow create: if isSignedIn() && (
        isAdmin() || (
          request.resource.data.type == 'vote_submitted'
          && request.resource.data.uid == request.auth.uid
          && request.resource.data.email == request.auth.token.email
          && request.resource.data.candidate is string
          && request.resource.data.keys().hasOnly(['type', 'uid', 'email', 'candidate', 'time'])
        )
      );
      allow read: if isSignedIn() && isAdmin();
      allow update, delete: if isAdmin();
    }

    match /announcements/{id} {
      allow read: if isSignedIn();
      allow create, update, delete: if isAdmin();
    }
  }
}
```

---

## functions/package.json

Purpose: This file lists the dependencies needed for the Firebase Cloud Function backend that receives and validates votes.

```json
{
  "name": "votesafe-functions",
  "private": true,
  "engines": { "node": "18" },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "firebase-admin": "^11.11.1",
    "firebase-functions": "^4.4.0"
  }
}
```

---

## backend/README.md

Purpose: This file documents how to configure and run the Node.js backend used for encrypted ballots and admin results.

```md
# VoteSafe — Backend (Demo)

This is a minimal Node.js + Express backend for the VoteSafe project.

## Quick start

1. Install dependencies

```bash
cd backend
npm install
```

2. Generate RSA key pair

```bash
npm run gen:keys
```

3. Generate Prisma client and migrate database

```bash
npx prisma generate
npx prisma migrate dev --name init
node prisma/seed.js
```

4. Run the server

```bash
npm run dev
```
```

---

## backend/package.json

Purpose: This file defines the backend scripts and dependencies for Express, Prisma, JWT, and database setup.

```json
{
  "name": "votesafe-backend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "nodemon src/index.js",
    "start": "node src/index.js",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev --name init",
    "seed": "node prisma/seed.js",
    "gen:keys": "node scripts/generate-keys.js",
    "tally": "node scripts/tally.js"
  },
  "dependencies": {
    "@prisma/client": "^5.0.0",
    "body-parser": "^1.20.2",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.22",
    "prisma": "^5.0.0"
  }
}
```

---

## backend/docker-compose.yml

Purpose: This file starts a local PostgreSQL database used by the Prisma backend during development.

```yml
version: '3.8'
services:
  db:
    image: postgres:15-alpine
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: votesafe_db
    volumes:
      - db_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
volumes:
  db_data:
```

---

## backend/scripts/generate-keys.js

Purpose: This script creates the RSA public/private key pair used for encrypting ballot keys and protecting vote data.

```javascript
const { generateKeyPairSync } = require('crypto');
const fs = require('fs');
const path = require('path');

const out = path.join(__dirname, '..', 'keys');
if (!fs.existsSync(out)) fs.mkdirSync(out, { recursive: true });

const { publicKey, privateKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
});

fs.writeFileSync(path.join(out, 'public.pem'), publicKey);
fs.writeFileSync(path.join(out, 'private.pem'), privateKey, { mode: 0o600 });
console.log('Generated keys at', out);
```

---

## backend/scripts/tally.js

Purpose: This script decrypts stored ballots and calculates the vote count for each candidate.

```javascript
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function tally(electionId){
  const keysDir = path.join(__dirname, '..', 'keys');
  const priv = path.join(keysDir, 'private.pem');
  if(!fs.existsSync(priv)) throw new Error('private key missing; run npm run gen:keys');
  const privatePem = fs.readFileSync(priv,'utf8');
  const ballots = await prisma.ballot.findMany({ where: { electionId: Number(electionId) } });
  const counts = {};
  for(const b of ballots){
    try{
      const encKeyBuf = Buffer.from(b.encKey, 'base64');
      const symmetricKey = crypto.privateDecrypt({key: privatePem, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, oaepHash:'sha256'}, encKeyBuf);
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
  return counts;
}

if(require.main === module){
  const [,, electionId] = process.argv;
  if(!electionId){
    console.error('Usage: node scripts/tally.js <electionId>');
    process.exit(1);
  }
  tally(electionId).then(counts=>{
    console.log('Tally results:', counts);
    process.exit(0);
  }).catch(err=>{
    console.error(err);
    process.exit(2);
  });
}

module.exports = tally;
```

---

## backend/prisma/seed.js

Purpose: This script populates the database with an example election and candidate list when the backend is first started.

```javascript
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main(){
  const election = await prisma.election.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      title: 'Dr Ogbonnaya Onu Polytechnic Student Council 2026',
      startsAt: new Date('2026-09-17T08:00:00Z'),
      endsAt: new Date('2026-09-17T20:00:00Z')
    }
  });
  await prisma.candidate.upsert({ where: { id: 1 }, update: {}, create: { id: 1, electionId: election.id, name: 'Amina Okafor', party: 'Community First', order: 1 } });
  await prisma.candidate.upsert({ where: { id: 2 }, update: {}, create: { id: 2, electionId: election.id, name: 'Daniel Brooks', party: 'Future Forward', order: 2 } });
  await prisma.candidate.upsert({ where: { id: 3 }, update: {}, create: { id: 3, electionId: election.id, name: 'Ike Praise', party: "People's Choice", order: 3 } });
  console.log('Seeded election and candidates');
}

main().catch(e=>{ console.error(e); process.exit(1); }).finally(()=>prisma.$disconnect());
```

---

## backend/.env.example

Purpose: This file shows the environment variables required for running the backend with PostgreSQL and JWT settings.

```env
# Copy to .env and edit for local development
DATABASE_URL=postgresql://postgres:password@localhost:5432/votesafe_db?schema=public
JWT_SECRET=change_this_to_a_random_value
ADMIN_TOKEN=change_admin_token_for_demo
```

---

## .github/workflows/deploy-pages.yml

Purpose: This GitHub Action automatically deploys the static website to GitHub Pages whenever changes are pushed to the main branch.

```yml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install dependencies (if any)
        run: |
          if [ -f package.json ]; then npm ci; fi

      - name: Build (noop for static)
        run: echo "No build step; deploying static site"

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_branch: gh-pages
          publish_dir: ./
```

---

End of documentation.
