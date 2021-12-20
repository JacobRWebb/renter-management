import { EnhancedStore } from "@reduxjs/toolkit";
import { authSlice } from "../store/authSlice";
import { axiosInstance } from "./constants";

export const checkToken = async (store: EnhancedStore, token: string) => {
  try {
    const response = await axiosInstance.post("user/token", { token });
    if (response.data.success) {
      delete response.data.success;
      store.dispatch(authSlice.actions.setUser(response.data));
    }
  } catch (error) {}
};
