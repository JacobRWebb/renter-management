import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const checkToken = (req: Request): string | undefined => {
  const token = req.cookies.token || req.body.token || undefined;
  if (token) {
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    if (verify) {
      const decode = jwt.decode(token) as { id: string };
      if (decode.id) {
        return decode.id;
      }
    }
  }
  return undefined;
};

export const authorized = (req: Request, res: Response, next: NextFunction) => {
  const id = checkToken(req);
  if (id) {
    res.locals.userId = id;
    return next();
  }

  return res.status(401).json({
    success: false,
    error: "Unauthorized",
  });
};

export const authorizedAsync = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = checkToken(req);
  if (id) {
    const user = await prisma.user.findFirst({
      where: { id },
      include: {
        name: true,
      },
    });
    if (user) {
      res.locals.user = user;
      return next();
    } else {
      return res.status(401).json({
        success: false,
        error: "User not found",
      });
    }
  }

  return res.status(401).json({
    success: false,
    error: "Unauthorized",
  });
};
