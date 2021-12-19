import axios, { AxiosInstance } from "axios";

export const isProd = process.env.NODE_ENV === "production";
export const URL = "https://xodius.io";
export const API_URL = isProd ? URL : "http://localhost:5000";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
