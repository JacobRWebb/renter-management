import { Router } from "express";
import { userController } from "../../controllers";
import { authorizedAsync } from "../../middleware";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const response = await userController.login(email, password);

    res
      .cookie("token", response.token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        maxAge: 1000 * 60 * 60 * 24 * 7,
        domain: "localhost",
        sameSite: "strict",
      })
      .json({ success: true });
  } catch (e) {
    res.json({
      success: false,
      error: e.message,
    });
  }
});

router.post("/preFetchUser", authorizedAsync, async (_req, res) => {
  return res.json({
    success: true,
    user: res.locals.user,
  });
});

router.get("/", (_req, res) => {
  res.send("User Endpoint");
});

export default router;
