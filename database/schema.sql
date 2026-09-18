CREATE TYPE user_role AS ENUM ('STUDENT', 'ADMIN');
CREATE TYPE user_status AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');
CREATE TYPE admin_role AS ENUM ('SUPER_ADMIN', 'ELECTION_ADMIN');
CREATE TYPE student_account_status AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');
CREATE TYPE election_status AS ENUM ('DRAFT', 'UPCOMING', 'ACTIVE', 'CLOSED');
CREATE TYPE eligibility_status AS ENUM ('ELIGIBLE', 'INELIGIBLE', 'DISABLED');
CREATE TYPE ballot_status AS ENUM ('SUBMITTED', 'REJECTED', 'FLAGGED');

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role user_role NOT NULL,
  status user_status NOT NULL DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  user_id INT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  student_id VARCHAR(50) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  department VARCHAR(255) NOT NULL,
  level VARCHAR(50) NOT NULL,
  account_status student_account_status NOT NULL DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  user_id INT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  full_name VARCHAR(255) NOT NULL,
  admin_role admin_role NOT NULL,
  status user_status NOT NULL DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE elections (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status election_status NOT NULL DEFAULT 'DRAFT',
  start_at TIMESTAMPTZ NOT NULL,
  end_at TIMESTAMPTZ NOT NULL,
  results_published BOOLEAN NOT NULL DEFAULT FALSE,
  created_by_admin_id INT REFERENCES admins(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (end_at > start_at)
);

CREATE TABLE positions (
  id SERIAL PRIMARY KEY,
  election_id INT NOT NULL REFERENCES elections(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  max_votes_per_voter INT NOT NULL DEFAULT 1,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (election_id, title)
);

CREATE TABLE candidates (
  id SERIAL PRIMARY KEY,
  election_id INT NOT NULL REFERENCES elections(id) ON DELETE CASCADE,
  position_id INT NOT NULL REFERENCES positions(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  department VARCHAR(255) NOT NULL,
  photo_url TEXT,
  manifesto TEXT,
  biography TEXT,
  status BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (election_id, position_id, name)
);

CREATE TABLE eligibility (
  id SERIAL PRIMARY KEY,
  election_id INT NOT NULL REFERENCES elections(id) ON DELETE CASCADE,
  student_id INT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  status eligibility_status NOT NULL DEFAULT 'ELIGIBLE',
  eligible_at TIMESTAMPTZ,
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (election_id, student_id)
);

CREATE TABLE ballots (
  id SERIAL PRIMARY KEY,
  election_id INT NOT NULL REFERENCES elections(id) ON DELETE CASCADE,
  voter_token_hash VARCHAR(255) UNIQUE NOT NULL,
  encrypted_ballot_blob TEXT NOT NULL,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status ballot_status NOT NULL DEFAULT 'SUBMITTED',
  verification_code VARCHAR(128) UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE ballot_items (
  id SERIAL PRIMARY KEY,
  ballot_id INT NOT NULL REFERENCES ballots(id) ON DELETE CASCADE,
  position_id INT NOT NULL REFERENCES positions(id) ON DELETE CASCADE,
  candidate_id INT NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
  choice_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (ballot_id, position_id)
);

CREATE TABLE election_results (
  id SERIAL PRIMARY KEY,
  election_id INT NOT NULL REFERENCES elections(id) ON DELETE CASCADE,
  position_id INT NOT NULL REFERENCES positions(id) ON DELETE CASCADE,
  candidate_id INT NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
  total_votes INT NOT NULL DEFAULT 0,
  percentage DECIMAL(5,2),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (election_id, position_id, candidate_id)
);

CREATE TABLE audit_logs (
  id SERIAL PRIMARY KEY,
  actor_type VARCHAR(50) NOT NULL,
  actor_id INT,
  action VARCHAR(255) NOT NULL,
  entity_type VARCHAR(255) NOT NULL,
  entity_id INT,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_elections_status ON elections(status);
CREATE INDEX idx_candidates_election ON candidates(election_id);
CREATE INDEX idx_eligibility_election ON eligibility(election_id);
CREATE INDEX idx_ballots_election ON ballots(election_id);
CREATE INDEX idx_audit_logs_actor ON audit_logs(actor_type, actor_id);
