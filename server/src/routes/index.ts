import { Router } from "express";
import propertyRoutes from "./propertyRoutes";
import stripeRoutes from "./stripeRoutes";
import userRoutes from "./userRoutes";
const router = Router();

router.use("/user", userRoutes);
router.use("/stripe", stripeRoutes);
router.use("/property", propertyRoutes);

router.get("/", (_req, res) => {
  res.send("Api Endpoint v1");
});

export default router;
