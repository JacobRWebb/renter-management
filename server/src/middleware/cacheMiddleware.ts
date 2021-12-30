import { NextFunction, Request, Response } from "express";
import { memcached } from "../util/constants";

export const avatarCache = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;

  memcached.get(`${userId}-avatar`, (_err, data) => {
    if (data) {
      res.contentType("image/png");
      return res.send(data);
    }
    return next();
  });
};
