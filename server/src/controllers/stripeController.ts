import { PrismaClient } from "@prisma/client";
import { stripe } from "../util/constants";
const prisma = new PrismaClient();

export const findOrCreateStripeAccount = async (email: string) => {
  let user = await prisma.stripe.findUnique({
    where: {
      userEmail: email,
    },
  });

  if (user) {
    return user;
  }

  const stripeAccount = await stripe.accounts.create({
    type: "custom",
    country: "US",
    capabilities: {
      card_payments: {
        requested: true,
      },
      transfers: {
        requested: true,
      },
      tax_reporting_us_1099_misc: {
        requested: true,
      },
    },
    business_type: "individual",
    email,
    default_currency: "usd",
  });

  user = await prisma.stripe.create({
    data: {
      id: stripeAccount.id,
      userEmail: email,
    },
  });

  return user;
};

export const createStripeCustomer = async (
  email: string,
  name: { firstName: string; middleInitial: string; lastName: string }
) => {
  const createStripeCustomer = await stripe.customers.create({
    name: `${name.firstName} ${name.middleInitial} ${name.lastName}`,
    email,
  });

  await prisma.stripe.upsert({
    where: {
      userEmail: email,
    },
    create: {
      id: createStripeCustomer.id,
      userEmail: email,
    },
    update: {
      id: createStripeCustomer.id,
      userEmail: email,
    },
  });
  return createStripeCustomer.id;
};

export const getStripeIdFromDatabase = async (email: string) => {
  const stripe = await prisma.stripe.findUnique({
    where: {
      userEmail: email,
    },
  });

  return stripe ? stripe.id : null;
};
