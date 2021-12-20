import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export const seedUser = async () => {
  const prisma = new PrismaClient();
  const hashedPassword = await bcrypt.hash("password", 10);
  await prisma.user.upsert({
    create: {
      username: "Xodius",
      password: hashedPassword,
      email: "random@gmail.com",
      firstName: "Xodius",
      middleInitial: "X",
      lastName: "Xodius",
    },
    update: { username: "Xodius", password: hashedPassword },
    where: { username: "Xodius" },
  });
};
