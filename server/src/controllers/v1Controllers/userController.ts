import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const userController = {
  login: async (username: string, password: string) => {
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });

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
        expiresIn: "1d",
      }
    );

    return {
      token,
    };
  },
};

export default userController;
