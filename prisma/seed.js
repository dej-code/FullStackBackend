const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();
const { faker } = require("@faker-js/faker");
async function seed(facultyMember = 10, Department = 1) {
  const hashedPassword = await bcrypt.hash("userpassword", 10);

  for (let i = 0; i < facultyMember; i++) {
    const faculty = await prisma.faculty.create({
      data: {
        name: faker.person.fullName(),
        bio: faker.lorem.paragraph(),
        email: faker.internet.email(),
        contactInfo: faker.phone.number(),
      },
    });

    const departmentData = [];
    for (let j = 0; j < Department; j++) {
      departmentData.push({
        name: faker.commerce.department(),
        description: faker.lorem.paragraph(),
        contactInfo: faker.phone.number(),
      });
    }

    await prisma.department.createMany({
      data: departmentData,
    });
  }

  await prisma.user.create({
    data: {
      email: "user@example.com",
      passwordHash: hashedPassword,
    },
  });

  console.log("Seeding completed");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
