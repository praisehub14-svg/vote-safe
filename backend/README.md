# VoteSafe — Backend (Demo)

This is a minimal Node.js + Express backend for the VoteSafe project (school demo).
It uses Prisma + SQLite for easy local setup. Ballots are stored as ciphertext and encrypted keys.

Quick start

1. Install dependencies

```bash
cd backend
npm install
```

2. Generate RSA key pair (published public key used by client)

```bash
npm run gen:keys
```

3. Generate Prisma client & migrate DB

```bash
npx prisma generate
npx prisma migrate dev --name init
node prisma/seed.js
```

4. Run the server

```bash
npm run dev
```

API (demo)

- `GET /api/public-key` — returns PEM public key
- `GET /api/elections` — list elections with candidates
- `POST /api/ballot/submit` — submit encrypted ballot: { electionId, ciphertext, encKey, meta }
- `GET /api/ballots/:electionId` — admin: list stored ballots (ciphertexts)

Notes

- This is a demo: for production use hardware key storage, audited cryptography, and strong authentication.
- To switch to PostgreSQL, update `prisma/schema.prisma` datasource and run `prisma migrate` with a Postgres URL.
