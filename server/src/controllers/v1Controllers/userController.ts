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
  token: async (token: string | undefined) => {
    if (!token || token === "") {
      throw new Error("No token provided");
    }
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    if (!verify) {
      throw new Error("Invalid token");
    }

    const decode = jwt.decode(token);
    if (!decode || typeof decode !== "object") {
      throw new Error("Invalid token");
    }

    const user = await prisma.user.findFirst({
      where: { id: decode.id },
      select: {
        id: true,
        username: true,
        roles: true,
        email: true,
        createdAt: true,
        ownedProperty: true,
        rentedProperty: true,
        workedProperty: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return {
      success: true,
      user,
    };
  },
};

export default userController;
