import { EnhancedStore } from "@reduxjs/toolkit";
import { User, userSlice } from "../store/userFeature";
import { axiosInstance } from "./constants";

export const checkToken = async (store: EnhancedStore, token: string) => {
  try {
    const response = await axiosInstance.post<{ user?: User }>(
      "user/preFetchUser",
      { token }
    );
    if (response.data.user) {
      const user: User = {
        ...response.data.user,
        avatar: {
          change: false,
          pending: false,
        },
      };
      store.dispatch(userSlice.actions.setUser(user));
    }
  } catch (error) {}
};
