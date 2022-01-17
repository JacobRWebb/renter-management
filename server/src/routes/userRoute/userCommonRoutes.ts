import { Router } from "express";
import { resendToken, verifyToken } from "../../controllers/userController";
import { authorizedAsync } from "../../middleware";
const router = Router();

router.post("/verify", authorizedAsync, async (_req, res) => {
  resendToken(res.locals.user);
  return res.json({
    success: true,
  });
});

router.post(`/verify/:token`, authorizedAsync, async (req, res) => {
  verifyToken(res.locals.user, req.params.token)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
    });
  return res.json({});
});

router.post("/preFetchUser", authorizedAsync, async (_req, res) => {
  try {
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
