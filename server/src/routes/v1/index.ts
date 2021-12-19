import { Router } from "express";
import userRoutes from "./userRoutes";

const router = Router();

router.use("/user", userRoutes);

router.get("/", (_req, res) => {
  res.send("Api Endpoint v1");
});

export default router;
