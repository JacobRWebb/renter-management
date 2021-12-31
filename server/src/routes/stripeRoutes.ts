import { Router } from "express";
import { stripeController } from "../controllers";
import { getStripeAccount } from "../controllers/stripeController";
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

router.post("/GetStripeAccount", authorizedAsync, async (_req, res) => {
  try {
    const stripeAccount = await getStripeAccount(res.locals.user.stripeId);

    return res.json({ stripeAccount });
  } catch (e) {
    return res.status(500).send({
      success: false,
      error: e.message,
    });
  }
});

export default router;
