import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
import { memcached, stripe } from "../util/constants";
const prisma = new PrismaClient();

export const createStripeAccount = async (email: string) => {
  const stripeAccount = await stripe.accounts.create({
    email,
    default_currency: "usd",
    country: "US",
    type: "custom",
    business_type: "individual",
    capabilities: {
      card_payments: {
        requested: true,
      },
      transfers: {
        requested: true,
      },
    },
  });

  await prisma.stripe.upsert({
    where: {
      userEmail: email,
    },
    create: {
      id: stripeAccount.id,
      userEmail: email,
    },
    update: {
      id: stripeAccount.id,
    },
  });
  return stripeAccount;
};

export const createStripeCustomer = async (
  email: string,
  name: { firstName: string; middleInitial: string; lastName: string }
) => {
  const stripeCustomer = await stripe.customers.create({
    email,
    name: `${name.firstName} ${name.middleInitial} ${name.lastName}`,
  });

  await prisma.stripe.upsert({
    where: {
      userEmail: email,
    },
    create: {
      id: stripeCustomer.id,
      userEmail: email,
    },
    update: {
      id: stripeCustomer.id,
    },
  });

  return stripeCustomer;
};

export const stripeFindOrCreateManagerAccount = async (
  email: string
): Promise<Stripe.Response<Stripe.Account>> => {
  const cache = await memcached.get(`${email}-stripe-manager-account`);
  if (cache.value !== null) {
    return JSON.parse(
      cache.value.toString()
    ) as Stripe.Response<Stripe.Account>;
  }
  let stripeAccount: Stripe.Response<Stripe.Account> | null = null;
  let manager = await prisma.stripe.findUnique({
    where: {
      userEmail: email,
    },
  });

  if (manager === null) {
    stripeAccount = await createStripeAccount(email);
  } else {
    stripeAccount = await stripe.accounts.retrieve(manager.id);
  }
  await memcached.set(
    `${email}-stripe-manager-account`,
    JSON.stringify(stripeAccount),
    { expires: 60 * 60 * 24 * 7 }
  );
  return stripeAccount;
};

export const stripeFindOrCreateCustomer = async (
  email: string,
  name: {
    firstName: string;
    middleInitial: string;
    lastName: string;
  }
): Promise<Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>> => {
  const cache = await memcached.get(`${email}-stripe-manager-account`);
  if (cache.value !== null) {
    return JSON.parse(cache.value.toString()) as Stripe.Response<
      Stripe.Customer | Stripe.DeletedCustomer
    >;
  }
  let stripeCustomer: Stripe.Response<
    Stripe.Customer | Stripe.DeletedCustomer
  > | null = null;
  let customer = await prisma.stripe.findUnique({
    where: {
      userEmail: email,
    },
  });

  if (customer === null) {
    stripeCustomer = await createStripeCustomer(email, name);
  } else {
    stripeCustomer = await stripe.customers.retrieve(customer.id);
  }
  await memcached.set(
    `${email}-stripe-customer-account`,
    JSON.stringify(stripeCustomer),
    { expires: 60 * 60 * 24 * 7 }
  );
  return stripeCustomer;
};
