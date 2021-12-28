import { Router } from "express";
import { stripeController } from "../controllers";
import { authorizedAsync } from "../middleware";
const router = Router();

router.post("/createPaymentIntent", authorizedAsync, async (req, res) => {
  try {
    const clientSecret = await stripeController.createPaymentIntent(
      res.locals.user,
      req.body.itemId
    );
    if (clientSecret) {
      return res.json({
        clientSecret,
      });
    }
  } catch (e) {
    return res.status(500).send({
      success: false,
      error: e.message,
    });
  }

  return res.status(500).send({
    success: false,
    error: "Something went wrong",
  });
});

export default router;
