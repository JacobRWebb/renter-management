import { Request, Response, Router } from "express";
import { getUserAvatar } from "../../controllers/userController";
import { authorizedAsync } from "../../middleware";
const router = Router();

router.get("/isBanned:userId", async (_req: Request, res: Response) => {
  return res.json({
    banned: false,
  });
});

router.post("/preFetchUser", authorizedAsync, async (_req, res) => {
  try {
    getUserAvatar(res.locals.user.id);
    delete res.locals.user.password;
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

export default router;
