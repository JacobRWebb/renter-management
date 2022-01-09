import { Request, Response, Router } from "express";
import {
  getUserAvatar,
  updateUserAvatar,
} from "../../controllers/userController";
import { authorizedAsync } from "../../middleware";
import { avatarCache } from "../../middleware/cacheMiddleware";
import { multer } from "../../util/constants";

// Route /user
const router = Router();

router.get(
  "/avatar/:userId",
  avatarCache,
  async (req: Request, res: Response) => {
    console.log("Called");

    const { userId } = req.params;
    try {
      const userAvatar = await getUserAvatar(userId);
      res.set("Content-Type", "image/png");
      return res.send(userAvatar);
    } catch (err) {
      return res.status(404).send(err.message);
    }
  }
);

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

export default router;
