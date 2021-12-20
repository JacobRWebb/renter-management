import { Router } from "express";
import { v1Controllers } from "../../controllers";

const router = Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const response = await v1Controllers.userController.login(
      username,
      password
    );
    res.cookie("token", response.token).json({ success: true });
  } catch (e) {
    res.json({
      success: false,
      error: e.message,
    });
  }
});

router.get("/", (_req, res) => {
  res.send("User Endpoint");
});

export default router;
