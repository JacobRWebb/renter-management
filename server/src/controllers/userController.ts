import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const login = async (email: string, password: string) => {
  let user:
    | (User & {
        name: {
          firstName: string;
          middleInitial: string;
          lastName: string;
        };
        stripeUserId: {
          stripeId: string;
        };
      })
    | null = null;

  if (email && password) {
    user = await prisma.user.findFirst({
      where: {
        email,
      },
      include: {
        name: {
          select: {
            firstName: true,
            middleInitial: true,
            lastName: true,
          },
        },
        stripeUserId: { select: { stripeId: true } },
      },
    });
  }

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Password is incorrect");
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "5d",
    }
  );

  //  TODO -- Belongs in register method
  // console.log(user);

  // if (!user.stripeUserId.stripeId) {
  //   // Check stripe account by email and create if not found
  //   const stripeUser = await stripe.customers.list({ email: user.email });
  //   if (stripeUser.data.length !== 0) {
  //     await stripe.customers.create({
  //       email: user.email,
  //       name: `${user.name.firstName} ${user.name.middleInitial} ${user.name.lastName}`,
  //     });
  //   } else {

  //   }
  //   // await stripe.customers.create({
  //   //   email: user.email,
  //   //   name: `${user.name.firstName} ${user.name.middleInitial} ${user.name.lastName}`,
  //   // });
  // }

  return {
    token,
  };
};
