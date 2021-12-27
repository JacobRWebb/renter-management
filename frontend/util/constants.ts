import { loadStripe } from "@stripe/stripe-js";
import axios, { AxiosInstance } from "axios";

export const isProd = process.env.NODE_ENV === "production";
export const URL = "https://xodius.io";
export const API_URL = isProd ? URL : "http://localhost:5000";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${API_URL}/v1/`,
  withCredentials: true,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const stripePromise = loadStripe(
  "pk_test_51K5bhmDyU6fCOjvWZYLBePQT0Pnl230fuQZ76u1whiS8pHqaamXiAxntkRhBTZWhE4a4hLC0AYQRjK2QcuHRV1Xz00tmIQa0HM"
);
