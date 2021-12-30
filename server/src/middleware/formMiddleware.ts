import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

export const validateMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) return next();

  const extractedErrors: { [key: string]: string } = {};

  errors.array().map((err) => {
    extractedErrors[err.param] = err.msg;
  });

  return res.status(200).json({
    errors: extractedErrors,
  });
};

export const loginFormInput = () =>
  [
    body("email")
      .isEmail()
      .withMessage("Invalid email address")
      .normalizeEmail(),
    body("password")
      .isString()
      .withMessage("Password is required")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters"),
  ] as ValidationChain[];
