import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findOrCreateStripeAccount } from "../controllers/stripeController";
import { dropbox, memcached } from "../util/constants";

const prisma = new PrismaClient();

const cacheUserAvatar = async (userId: string, buffer: Buffer) => {
  await memcached.set(`${userId}-avatar`, buffer, { expires: 60 });
};

export const getUserAvatar = async (userId: string) => {
  try {
    const dropboxCall = await dropbox.filesDownload({
      path: `/avatars/${userId}.png`,
    });

    if (dropboxCall.result) {
      const { fileBinary } = dropboxCall.result as any;
      await cacheUserAvatar(userId, fileBinary);
      return fileBinary as Buffer;
    } else {
      throw new Error("Not found");
    }
  } catch (error) {
    const dropboxCall = await dropbox.filesDownload({
      path: `/avatars/avatar.png`,
    });
    if (dropboxCall.result) {
      const { fileBinary } = dropboxCall.result as any;
      await cacheUserAvatar(userId, fileBinary);
      return fileBinary as Buffer;
    } else {
      throw new Error("Image Missing");
    }
  }
};

export const updateUserAvatar = async (userId: string, buffer: Buffer) => {
  await dropbox.filesUpload({
    contents: buffer,
    mode: {
      ".tag": "overwrite",
    },
    path: `/avatars/${userId}.png`,
  });
  await cacheUserAvatar(userId, buffer);
};

// Util

//  Login
export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ token?: string; errors?: { [key: string]: string } }> => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user === null) {
    return {
      errors: {
        email: "User not found",
      },
    };
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return {
      errors: {
        password: "Incorrect password",
      },
    };
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "7 days",
  });

  return { token };
};

// Register
export const registerUser = async (
  email: string,
  nameInput: { firstName: string; middleInitial: string; lastName: string },
  password: string,
  roles: Role[] = ["TENANT"]
) => {
  const user = await getUserByEmail(email);
  if (user) {
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const name = await findOrCreateName(email, nameInput);
  const stripeAccount = await findOrCreateStripeAccount(email);

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      roles,
      stripe: {
        connect: {
          id: stripeAccount.id,
        },
      },
      name: {
        connect: {
          id: name.id,
        },
      },
    },
  });
};

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

const findOrCreateName = async (
  email: string,
  nameInput: { firstName: string; middleInitial: string; lastName: string }
) => {
  let name = await prisma.name.findUnique({
    where: {
      userEmail: email,
    },
  });

  if (name === null) {
    name = await prisma.name.create({
      data: {
        firstName: nameInput.firstName,
        middleInitial: nameInput.middleInitial,
        lastName: nameInput.lastName,
        userEmail: email,
      },
    });
  }

  return name;
};
