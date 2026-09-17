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
