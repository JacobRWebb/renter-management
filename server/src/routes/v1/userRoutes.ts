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
    res
      .cookie("token", response.token, {
        httpOnly: true,
        maxAge: 12 * 24 * 60 * 10,
        secure: false,
        domain: "localhost",
      })
      .json({ success: true });
  } catch (e) {
    res.json({
      success: false,
      error: e.message,
    });
  }
});

router.post("/token", async (req, res) => {
  const { token } = req.body;
  try {
    const response = await v1Controllers.userController.token(token);
    return res.json(response);
  } catch (e) {
    return res.json({ success: false, error: e.message });
  }
});

router.get("/", (_req, res) => {
  res.send("User Endpoint");
});

export default router;
