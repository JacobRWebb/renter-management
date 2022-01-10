import Cloudinary from "cloudinary";
import { Client } from "memjs";
import Multer from "multer";
import Stripe from "stripe";

export const isProd = process.env.NODE_ENV === "production";

export const DOMAIN = isProd ? "xodius.io" : "localhost";

export const stripe: Stripe = require("stripe")(
  process.env.STRIPE_SECRET_KEY || "failed"
);

export const memcached = Client.create();
export const multer = Multer({});

export const cloudinary = Cloudinary.v2;

cloudinary.config({
  cloud_name: "xodius",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});
