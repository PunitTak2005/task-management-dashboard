const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.task.createMany({
    data: [
      {
        title: 'Design homepage',
        description: 'Create wireframes and high‑fidelity mockups for the landing page.',
        status: 'TODO',
      },
      {
        title: 'Implement authentication',
        description: 'Add JWT based login and registration.',
        status: 'IN_PROGRESS',
      },
      {
        title: 'Deploy to production',
        description: 'Configure Docker and push to Vercel.',
        status: 'DONE',
      },
    ],
  });
  console.log('🌱 Seed data inserted');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
