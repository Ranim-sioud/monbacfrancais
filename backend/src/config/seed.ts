import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('MonBac2026!', 12);

  const admin = await prisma.user.upsert({
    where: { email: 'sioudranim@gmail.com' },
    update: {},
    create: {
      name: 'Administrateur',
      email: 'sioudranim@gmail.com',
      passwordHash,
      role: 'ADMIN',
      country: 'FR',
    },
  });

  console.log('Admin créé :', admin.email);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
