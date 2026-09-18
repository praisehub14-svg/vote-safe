const features = [
  {
    icon: '✓',
    title: 'Secure Voting',
    description: 'Protect ballot integrity with strong authentication and server-side validation.',
  },
  {
    icon: '1',
    title: 'One Vote Per Student',
    description: 'Eligible students can vote once per election, preventing duplicate participation.',
  },
  {
    icon: '⚡',
    title: 'Fast & Simple',
    description: 'A clear voting flow makes casting a ballot easy and accessible for students.',
  },
  {
    icon: '▣',
    title: 'Transparent Results',
    description: 'Official results are published only after the election is officially closed.',
  },
];

const stats = [
  { value: '256', label: 'Bit encryption' },
  { value: '99.9%', label: 'Uptime' },
  { value: '100%', label: 'Anonymous ballots' },
  { value: '24/7', label: 'Monitoring' },
];

function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="brand" aria-label="VoteSafe brand">
          <span className="brand-mark">VS</span>
          <span>VoteSafe</span>
        </div>

        <nav className="nav" aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#elections">Elections</a>
          <a href="#about">About</a>
          <a href="#help">Help</a>
        </nav>

        <div className="header-actions">
          <button className="btn btn-secondary" type="button">Login</button>
          <button className="btn btn-primary" type="button">Register</button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <h1>
              Your Vote.
              <br />
              Your Voice.
              <br />
              Your Choice.
            </h1>
            <p>
              Vote securely and conveniently in your school elections with a trusted, accessible voting platform.
            </p>

            <div className="hero-actions">
              <button className="btn btn-primary" type="button">Vote Now</button>
              <button className="btn btn-secondary" type="button">Learn How It Works</button>
            </div>
          </div>

          <div className="hero-panel" aria-label="Secure voting card preview">
            <div className="card-grid">
              <div className="info-card">
                <strong>Secure voting status</strong>
                <span>Protected by server-side validation and encrypted ballot storage.</span>
              </div>

              <div className="info-card">
                <strong>Active election</strong>
                <span>SUG Election 2026 • Opens 15 Sep 2026 • Closes 25 Sep 2026</span>
              </div>

              <div className="info-card">
                <strong>Ballot security</strong>
                <span>Anonymous vote records and role-based access controls are enforced.</span>
              </div>
            </div>
          </div>
        </section>

        <section className="stats-row" aria-label="VoteSafe key stats">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-box">
              <b>{stat.value}</b>
              <span>{stat.label}</span>
            </div>
          ))}
        </section>

        <section className="section" id="how-it-works">
          <div className="section-header">
            <h2>How VoteSafe works</h2>
          </div>

          <div className="feature-grid">
            {features.map((feature) => (
              <article key={feature.title} className="feature-card">
                <div className="icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
