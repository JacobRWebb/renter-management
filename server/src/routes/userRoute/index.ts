import { Router } from "express";
import userAuthRoutes from "./userAuthRoutes";
import userAvatarRoutes from "./userAvatarRoutes";
import userCommonRoutes from "./userCommonRoutes";

// Route /user
const router = Router();

router.use(userAvatarRoutes);
router.use(userAuthRoutes);
router.use(userCommonRoutes);

router.use("/", (_req, res) => {
  res.send("User Endpoint");
});

export default router;
