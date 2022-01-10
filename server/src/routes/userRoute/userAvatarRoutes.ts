import { Router } from "express";
import {
  getUserAvatar,
  updateUserAvatar,
} from "../../controllers/userController";
import { authorizedAsync } from "../../middleware";
import { multer } from "../../util/constants";

// Route /user
const router = Router();

router.post("/", authorizedAsync, multer.single("avatar"), async (req, res) => {
  updateUserAvatar(res.locals.user.id, req.file)
    .then(() => {
      return res.json({
        success: true,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        error: error.message,
      });
    });
});

// TODO: Cache Response
router.get("/:userId", async (req, res) => {
  getUserAvatar(req.params.userId)
    .then((response) => {
      return res.status(200).json({
        avatarLink: response,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        error: error.message,
      });
    });
});

export default router;
