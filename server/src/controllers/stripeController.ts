import { PrismaClient, User } from "@prisma/client";
import { stripe } from "../util/constants";
const prisma = new PrismaClient();

export const createPaymentIntent = async (user: User, itemId: string) => {
  const stripeId = await stripeIdFromUser(user);
  await cancelPaymentIntents(stripeId);

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
    customer: stripeId,
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

export const stripeIdFromUser = async (user: User) => {
  const stripeToUser = await prisma.stripeToUser.findFirst({
    where: { User: { id: user.id } },
  });

  if (stripeToUser) {
    return stripeToUser.stripeId;
  }
  throw new Error("Unable to locate stripe id");
};
