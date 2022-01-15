import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import streamifier from "streamifier";
import { cloudinary } from "../util/constants";
import {
  stripeFindOrCreateCustomer,
  stripeFindOrCreateManagerAccount,
} from "./stripeController";

const prisma = new PrismaClient();

export const getUserAvatar = async (userId: string): Promise<string> => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      avatarLink: true,
    },
  });

  if (user === null) {
    // FEATURE: Possibly return a default avatar
    throw new Error("User not found");
  }

  return user.avatarLink;
};

export const updateUserAvatar = async (
  userId: string,
  file: Express.Multer.File | undefined
) => {
  if (file === undefined) {
    throw new Error("No file");
  }

  const avatarStream = await cloudinary.uploader.upload_stream({
    folder: "avatars",
    public_id: userId,
    overwrite: true,
  });

  streamifier.createReadStream(file.buffer).pipe(avatarStream);
};

//  Login
export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ token?: string; errors?: { [key: string]: string } }> => {
  email.toLowerCase();

  const user = await prisma.user.findFirst({
    where: {
      email: {
        equals: email,
        mode: "insensitive",
      },
    },
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
export const registerManager = async (
  email: string,
  nameInput: { firstName: string; middleInitial: string; lastName: string },
  password: string,
  roles: Role[] = ["MANAGER"]
) => {
  const user = await getUserByEmail(email);
  if (user) {
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const name = await findOrCreateName(email, nameInput);
  const stripeAccount = await stripeFindOrCreateManagerAccount(email);

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
  const stripeAccount = await stripeFindOrCreateCustomer(email, name);

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
