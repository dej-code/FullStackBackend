const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { faker } = require("@faker-js/faker");
async function seed(facultyMember = 50, Department = 10) {
  for (let j = 0; j < Department; j++) {
    await prisma.department.createMany({
      data: {
        name: faker.commerce.department(),
        description: faker.lorem.paragraph(),
        contactInfo: faker.phone.number(),
      },
    });
  }
  const faculty = [];
  for (let i = 0; i < facultyMember; i++) {
    await prisma.faculty.createMany({
      data: {
        name: faker.person.fullName(),
        bio: faker.lorem.paragraph(),
        email: faker.internet.email(),
        contactInfo: faker.phone.number(),
        departmentId: Math.floor(Math.random() * Department) + 1,
      },
    });

    console.log("Seeding completed");
  }
}
seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
