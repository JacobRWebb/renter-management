import { User } from "@prisma/client";
import Stripe from "stripe";
import { memcached, stripe } from "../util/constants";

export const createPaymentIntent = async (user: User, itemId: string) => {
  await cancelPaymentIntents(user.stripeId);

  const items = [
    { itemId: "982", price: 20.45 },
    { itemId: "645", price: 100.6355 },
  ];
  const item = items.find((i) => i.itemId === itemId);
  if (!item) {
    throw new Error("Item not found");
  }

  const amount = item.price * 100;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
    customer: user.stripeId,
    metadata: {
      itemId,
    },
  });

  return paymentIntent.client_secret;
};

export const cancelPaymentIntents = async (stripeId: string) => {
  const paymentIntents = await stripe.paymentIntents.list({
    customer: stripeId,
  });
  for (const paymentIntent of paymentIntents.data) {
    if (paymentIntent.status === "requires_payment_method") {
      await stripe.paymentIntents.cancel(paymentIntent.id, {
        cancellation_reason: "abandoned",
      });
    }
  }
};

export const getStripeAccount = async (stripeId: string) => {
  const data = await memcached.get(`getStripeAccount-${stripeId}`);
  if (data.value !== null) {
    const stripeCustomer: Stripe.Response<
      Stripe.Customer | Stripe.DeletedCustomer
    > = JSON.parse(data.value.toString());
    return stripeCustomer;
  }
  const stripeCustomer = await stripe.customers.retrieve(stripeId);
  await memcached.set(
    `getStripeAccount-${stripeId}`,
    JSON.stringify(stripeCustomer),
    { expires: 60 * 60 * 24 }
  );
  return stripeCustomer;
};
