import { Request, Response, Router } from "express";
import {
  getUserAvatar,
  login,
  updateUserAvatar,
} from "../controllers/userController";
import { authorizedAsync } from "../middleware";
import { avatarCache } from "../middleware/cacheMiddleware";
import {
  loginFormInput,
  validateMiddleware,
} from "../middleware/formMiddleware";
import { DOMAIN, multer } from "../util/constants";

const router = Router();

router.post(
  "/avatar/",
  authorizedAsync,
  multer.single("avatar"),
  async (req, res) => {
    try {
      if (!req.file) throw new Error("No file");
      await updateUserAvatar(res.locals.user.id, req.file.buffer);
    } catch (err) {
      return res.status(400).send(err.message);
    }

    return res.json({
      success: true,
    });
  }
);

router.get("/avatar/:userId", avatarCache, async (req, res) => {
  const { userId } = req.params;

  try {
    const userAvatar = await getUserAvatar(userId);
    res.set("Content-Type", "image/png");
    return res.send(userAvatar);
  } catch (err) {
    return res.status(404).send(err.message);
  }
});

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

router.post("/preFetchUser", authorizedAsync, async (_req, res) => {
  try {
    await getUserAvatar(res.locals.user.id);
    delete res.locals.user.password;
    delete res.locals.user.nameId;
    delete res.locals.user.stripeId;
    delete res.locals.user.name.id;
    delete res.locals.user.name.userId;

    return res.json({
      user: res.locals.user,
    });
  } catch (error) {
    return res.json({
      success: false,
      error: {
        system: `Login Failed - ${error.message}`,
      },
    });
  }
});

router.get("/", (_req, res) => {
  res.send("User Endpoint");
});

export default router;
