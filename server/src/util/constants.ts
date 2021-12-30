import { Dropbox } from "dropbox";
import { Client } from "memjs";
import Multer from "multer";
import Stripe from "stripe";

export const isProd = process.env.NODE_ENV === "production";

export const DOMAIN = isProd ? "xodius.io" : "localhost";

export const stripe: Stripe = require("stripe")(
  process.env.STRIPE_SECRET_KEY || "failed"
);

export const memcached = Client.create();
export const dropbox = new Dropbox({
  accessToken: process.env.DROPBOX_TOKEN,
});
export const multer = Multer();
