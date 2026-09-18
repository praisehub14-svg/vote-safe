const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // DEVELOPMENT ONLY DEMO CREDENTIALS
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@votesafe.dev' },
    update: {},
    create: {
      email: 'admin@votesafe.dev',
      passwordHash: '$2b$12$DEVELOPMENT_ONLY_HASH_PLACEHOLDER',
      role: 'ADMIN',
      status: 'ACTIVE'
    }
  });

  await prisma.admin.upsert({
    where: { userId: adminUser.id },
    update: {},
    create: {
      userId: adminUser.id,
      fullName: 'Mariam Okafor',
      adminRole: 'SUPER_ADMIN',
      status: 'ACTIVE'
    }
  });

  const election = await prisma.election.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      title: 'SUG Election 2026',
      description: 'Student Union Government election for the 2026 academic session.',
      status: 'ACTIVE',
      startAt: new Date('2026-09-15T08:00:00.000Z'),
      endAt: new Date('2026-09-25T18:00:00.000Z'),
      resultsPublished: false,
      createdByAdminId: 1
    }
  });

  const positions = [
    { title: 'SUG President', description: 'Leads the student union executive council.' },
    { title: 'Vice President', description: 'Supports the president and chairs committees.' },
    { title: 'General Secretary', description: 'Coordinates communication and records.' },
    { title: 'Financial Secretary', description: 'Oversees budgeting and financial reporting.' },
    { title: 'PRO', description: 'Handles public communication and student engagement.' }
  ];

  const createdPositions = [];

  for (const position of positions) {
    const created = await prisma.position.upsert({
      where: { electionId_title: { electionId: election.id, title: position.title } },
      update: {},
      create: {
        electionId: election.id,
        title: position.title,
        description: position.description,
        maxVotesPerVoter: 1,
        isActive: true
      }
    });
    createdPositions.push(created);
  }

  const candidateRows = [
    { positionTitle: 'SUG President', name: 'Amina Okafor', department: 'Computer Science', manifesto: 'Create transparent student governance and stronger campus support.', biography: 'Student leader and project advocate.' },
    { positionTitle: 'SUG President', name: 'Daniel Brooks', department: 'Business Administration', manifesto: 'Improve communication and student welfare services.', biography: 'Former class representative.' },
    { positionTitle: 'SUG President', name: 'Ike Praise', department: 'Mass Communication', manifesto: 'Strengthen storytelling, inclusion, and accountability.', biography: 'Campus media contributor.' },

    { positionTitle: 'Vice President', name: 'Blessing Emmanuel', department: 'Accounting', manifesto: 'Support student participation and leadership capacity.', biography: 'Volunteer coordinator.' },
    { positionTitle: 'Vice President', name: 'Chidera Nwosu', department: 'Civil Engineering', manifesto: 'Develop practical student engagement programs.', biography: 'Community outreach volunteer.' },
    { positionTitle: 'Vice President', name: 'Samuel Uche', department: 'Political Science', manifesto: 'Bridge student issues with administration.', biography: 'Debate club member.' },

    { positionTitle: 'General Secretary', name: 'Ruth Adeyemi', department: 'Public Administration', manifesto: 'Improve documentation, communication, and transparency.', biography: 'Administrative support leader.' },
    { positionTitle: 'General Secretary', name: 'Oluwatobi Akin', department: 'Computer Science', manifesto: 'Digitize student communication records.', biography: 'Campus software club mentor.' },
    { positionTitle: 'General Secretary', name: 'Musa Ibrahim', department: 'Economics', manifesto: 'Promote active student forums and timely updates.', biography: 'Student council committee member.' },

    { positionTitle: 'Financial Secretary', name: 'Grace Nnamani', department: 'Banking and Finance', manifesto: 'Build accountable budget systems and student welfare funds.', biography: 'Finance club chair.' },
    { positionTitle: 'Financial Secretary', name: 'Tunde Lawal', department: 'Accounting', manifesto: 'Improve funding access for clubs and student events.', biography: 'Budget planning volunteer.' },
    { positionTitle: 'Financial Secretary', name: 'Adaobi Okoye', department: 'Business Administration', manifesto: 'Create transparent and fair student allocations.', biography: 'Peer mentor and treasurer.' },

    { positionTitle: 'PRO', name: 'Favour Eze', department: 'Mass Communication', manifesto: 'Highlight student issues through clear media engagement.', biography: 'Newsroom contributor and event host.' },
    { positionTitle: 'PRO', name: 'Kingsley Opara', department: 'Marketing', manifesto: 'Increase visibility for student events and welfare support.', biography: 'Student ambassador.' },
    { positionTitle: 'PRO', name: 'Nneka Anya', department: 'Journalism', manifesto: 'Create inclusive updates and stronger student participation.', biography: 'Campus media organizer.' }
  ];

  for (const candidate of candidateRows) {
    const position = createdPositions.find((item) => item.title === candidate.positionTitle);
    if (!position) continue;

    await prisma.candidate.upsert({
      where: {
        electionId_positionId_name: {
          electionId: election.id,
          positionId: position.id,
          name: candidate.name
        }
      },
      update: {},
      create: {
        electionId: election.id,
        positionId: position.id,
        name: candidate.name,
        department: candidate.department,
        photoUrl: `https://images.example.com/${candidate.name.toLowerCase().replace(/\s+/g, '-')}.jpg`,
        manifesto: candidate.manifesto,
        biography: candidate.biography,
        status: true
      }
    });
  }

  const students = [
    { studentId: '2024001', fullName: 'Aisha Bello', department: 'Computer Science', level: '300', email: 'aisha.bello@school.edu' },
    { studentId: '2024002', fullName: 'Daniel Okafor', department: 'Business Administration', level: '200', email: 'daniel.okafor@school.edu' },
    { studentId: '2024003', fullName: 'Efe James', department: 'Mass Communication', level: '400', email: 'efe.james@school.edu' },
    { studentId: '2024004', fullName: 'Joy Amah', department: 'Political Science', level: '300', email: 'joy.amah@school.edu' },
    { studentId: '2024005', fullName: 'Kelechi Nwosu', department: 'Civil Engineering', level: '200', email: 'kelechi.nwosu@school.edu' },
    { studentId: '2024006', fullName: 'Michael Thomas', department: 'Accounting', level: '100', email: 'michael.thomas@school.edu' },
    { studentId: '2024007', fullName: 'Ngozi Eze', department: 'Public Administration', level: '400', email: 'ngozi.eze@school.edu' },
    { studentId: '2024008', fullName: 'Samuel Udo', department: 'Economics', level: '300', email: 'samuel.udo@school.edu' },
    { studentId: '2024009', fullName: 'Rita Okoye', department: 'Banking and Finance', level: '200', email: 'rita.okoye@school.edu' },
    { studentId: '2024010', fullName: 'Victor Chima', department: 'Marketing', level: '100', email: 'victor.chima@school.edu' }
  ];

  for (const student of students) {
    const user = await prisma.user.upsert({
      where: { email: student.email },
      update: {},
      create: {
        email: student.email,
        passwordHash: '$2b$12$DEVELOPMENT_ONLY_HASH_PLACEHOLDER',
        role: 'STUDENT',
        status: 'ACTIVE'
      }
    });

    await prisma.student.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        studentId: student.studentId,
        fullName: student.fullName,
        department: student.department,
        level: student.level,
        accountStatus: 'ACTIVE'
      }
    });

    await prisma.eligibility.upsert({
      where: { electionId_studentId: { electionId: election.id, studentId: (await prisma.student.findUnique({ where: { studentId: student.studentId } })).id } },
      update: {},
      create: {
        electionId: election.id,
        studentId: (await prisma.student.findUnique({ where: { studentId: student.studentId } })).id,
        status: 'ELIGIBLE',
        eligibleAt: new Date(),
        reason: 'Development seed eligibility'
      }
    });
  }

  console.log('Seeded VoteSafe demo data: admin, students, election, positions, candidates, eligibility');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
