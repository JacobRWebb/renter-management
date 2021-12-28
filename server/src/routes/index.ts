import { Router } from "express";
import stripeRoutes from "./stripeRoutes";
import userRoutes from "./userRoutes";

const router = Router();

router.use("/user", userRoutes);
router.use("/stripe", stripeRoutes);

router.get("/", (_req, res) => {
  res.send("Api Endpoint v1");
});

export default router;
