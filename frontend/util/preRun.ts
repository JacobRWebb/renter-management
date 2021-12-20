import { EnhancedStore } from "@reduxjs/toolkit";
import { authSlice } from "../store/authSlice";
import { axiosInstance } from "./constants";

export const checkToken = async (store: EnhancedStore, token: string) => {
  try {
    const response = await axiosInstance.post("user/token", { token });
    if (response.data.success) {
      const { id, username } = response.data;
      store.dispatch(authSlice.actions.setUser({ id, username }));
    }
  } catch (error) {}
};
