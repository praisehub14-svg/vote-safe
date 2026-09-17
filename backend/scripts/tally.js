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
