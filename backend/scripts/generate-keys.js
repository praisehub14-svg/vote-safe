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
