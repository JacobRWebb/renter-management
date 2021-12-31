import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { dropbox, stripe } from "./constants";
const prisma = new PrismaClient();

export const seedUser = async () => {
  const user = await prisma.user.findFirst({
    where: { email: "test@gmail.com" },
  });

  if (!user) {
    const stripeCustomer = await stripe.customers.create({
      email: "test@gmail.com",
      name: "Test T User",
    });

    const newUser = await prisma.user.create({
      data: {
        email: "test@gmail.com",
        password: await bcrypt.hash("password", 12),
        stripeId: stripeCustomer.id,
        name: {
          create: {
            firstName: "Test",
            middleInitial: "T",
            lastName: "User",
          },
        },
      },
    });

    try {
      await dropbox.filesCopyV2({
        from_path: "/avatars/avatar.png",
        to_path: `/avatars/${newUser.id}.png`,
      });
    } catch (error) {}
  }
};
