-- DEVELOPMENT ONLY DEMO DATA
INSERT INTO users (email, password_hash, role, status)
VALUES
  ('admin@votesafe.dev', '$2b$12$DEVELOPMENT_ONLY_HASH_PLACEHOLDER', 'ADMIN', 'ACTIVE'),
  ('aisha.bello@school.edu', '$2b$12$DEVELOPMENT_ONLY_HASH_PLACEHOLDER', 'STUDENT', 'ACTIVE'),
  ('daniel.okafor@school.edu', '$2b$12$DEVELOPMENT_ONLY_HASH_PLACEHOLDER', 'STUDENT', 'ACTIVE'),
  ('efe.james@school.edu', '$2b$12$DEVELOPMENT_ONLY_HASH_PLACEHOLDER', 'STUDENT', 'ACTIVE');

INSERT INTO admins (user_id, full_name, admin_role, status)
VALUES (1, 'Mariam Okafor', 'SUPER_ADMIN', 'ACTIVE');

INSERT INTO students (user_id, student_id, full_name, department, level, account_status)
VALUES
  (2, '2024001', 'Aisha Bello', 'Computer Science', '300', 'ACTIVE'),
  (3, '2024002', 'Daniel Okafor', 'Business Administration', '200', 'ACTIVE'),
  (4, '2024003', 'Efe James', 'Mass Communication', '400', 'ACTIVE');

INSERT INTO elections (title, description, status, start_at, end_at, results_published, created_by_admin_id)
VALUES (
  'SUG Election 2026',
  'Student union government election for the 2026 session.',
  'ACTIVE',
  NOW() - INTERVAL '3 days',
  NOW() + INTERVAL '7 days',
  FALSE,
  1
);

INSERT INTO positions (election_id, title, description, max_votes_per_voter, is_active)
VALUES
  (1, 'SUG President', 'Leads the student union executive council.', 1, TRUE),
  (1, 'Vice President', 'Supports the president in governance.', 1, TRUE),
  (1, 'General Secretary', 'Coordinates communication and records.', 1, TRUE);

INSERT INTO candidates (election_id, position_id, name, department, manifesto, biography, status)
VALUES
  (1, 1, 'Amina Okafor', 'Computer Science', 'Create transparent student governance.', 'Student leader', TRUE),
  (1, 1, 'Daniel Brooks', 'Business Administration', 'Improve student welfare services.', 'Former class rep', TRUE),
  (1, 2, 'Blessing Emmanuel', 'Accounting', 'Support student participation.', 'Volunteer coordinator', TRUE),
  (1, 3, 'Ruth Adeyemi', 'Public Administration', 'Improve records and communication.', 'Administrative support leader', TRUE);

INSERT INTO eligibility (election_id, student_id, status, eligible_at, reason)
VALUES
  (1, 1, 'ELIGIBLE', NOW(), 'Development seed data'),
  (1, 2, 'ELIGIBLE', NOW(), 'Development seed data'),
  (1, 3, 'ELIGIBLE', NOW(), 'Development seed data');

INSERT INTO audit_logs (actor_type, actor_id, action, entity_type, entity_id, metadata)
VALUES
  ('ADMIN', 1, 'CREATE_ELECTION', 'elections', 1, '{"title":"SUG Election 2026"}');
