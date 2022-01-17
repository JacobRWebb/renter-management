import { PrismaClient, Role, User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import streamifier from "streamifier";
import { cloudinary } from "../util/constants";
import {
  stripeFindOrCreateCustomer,
  stripeFindOrCreateManagerAccount,
} from "./stripeController";

const prisma = new PrismaClient();

export const getUserAvatar = (userId: string) =>
  new Promise<string>((resolve, reject) => {
    prisma.user
      .findUnique({
        where: {
          id: userId,
        },
      })
      .then((user) => {
        if (user === null) {
          reject("User not found");
        } else {
          resolve(user.avatarLink);
        }
      })
      .catch((err) => {
        reject(err.message);
      });
  });

export const updateUserAvatar = (
  userId: string | null,
  file: Express.Multer.File | undefined
) =>
  new Promise<void>((resolve, reject) => {
    if (userId === null) {
      reject("User not found");
      return;
    }
    if (file === undefined) {
      reject("No File");
      return;
    }

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "avatars",
        public_id: userId,
        overwrite: true,
      },
      async (err, result) => {
        if (result === undefined) {
          reject("Error uploading file");
          return;
        }
        if (err) {
          reject(err.message);
          return;
        } else {
          console.log(result);
          await prisma.user.update({
            where: {
              id: userId,
            },
            data: {
              avatarLink: result.secure_url,
            },
          });

          resolve();
        }
      }
    );
    streamifier.createReadStream(file.buffer).pipe(stream);
    resolve();
  });

// export const updateUserAvatard = async (
//   userId: string,
//   file: Express.Multer.File | undefined
// ) => {
//   if (file === undefined) {
//     throw new Error("No file");
//   }

//   const avatarStream = await cloudinary.uploader.upload_stream({
//     folder: "avatars",
//     public_id: userId,
//     overwrite: true,
//   });

//   streamifier.createReadStream(file.buffer).pipe(avatarStream);
// };

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

export const verifyToken = async (user: User | null, token: string | null) => {
  if (user === null) throw new Error("User not found");
  if (token === null) throw new Error("Token not found");

  if (user.verified) throw new Error("User already verified");

  if (user.verifyToken !== token) throw new Error("Invalid token");

  if (user.verifyToken === token) {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        verified: true,
      },
    });
  }
};

export const resendToken = async (user: User | null) => {
  if (user === null) throw new Error("User not found");

  // TODO send email with token
};
