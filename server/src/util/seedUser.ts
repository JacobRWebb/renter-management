import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { stripe } from "./constants";

const prisma = new PrismaClient();

export const seedUser = async () => {
  const user = await prisma.user.findFirst({
    where: { email: "test@gmail.com" },
  });

  if (!user) {
    const stripeCustomer = await stripe.customers.create({
      email: "test@gmail.com",
      name: `Test T User`,
    });
    await prisma.user.create({
      data: {
        email: "test@gmail.com",
        password: await bcrypt.hash("password", 12),
        name: {
          create: {
            firstName: "Test",
            middleInitial: "T",
            lastName: "User",
          },
        },
        stripeUserId: {
          create: {
            stripeId: stripeCustomer.id,
          },
        },
      },
    });
  }
};
