import { Request, Response, Router } from "express";
import { login } from "../../controllers/userController";
import {
  loginFormInput,
  validateMiddleware,
} from "../../middleware/formMiddleware";
import { DOMAIN } from "../../util/constants";
const router = Router();

router.post(
  "/login",
  loginFormInput,
  validateMiddleware,
  async (req: Request, res: Response) => {
    try {
      const loginResponse = await login({ ...req.body });

      if (loginResponse.errors) {
        return res.json({ errors: loginResponse.errors });
      }

      if (!loginResponse.token) throw new Error("Token Failed to generate");

      return res
        .cookie("token", loginResponse.token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
          domain: `${DOMAIN}`,
          sameSite: "strict",
        })
        .status(200)
        .json({});
    } catch (e) {
      return res.json({
        success: false,
        error: {
          system: `Login Failed - ${e.message}`,
        },
      });
    }
  }
);

export default router;
