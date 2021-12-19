import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export interface IUser {
  username: string;
}

export interface IAuthState {
  user: IUser | null;
}

const defaultAuthState: IAuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: defaultAuthState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      return {
        ...current(state),
        user: {
          ...action.payload,
        },
      };
    },
  },
  extraReducers: (builder) => {
    return builder.addCase(HYDRATE, (state, action: any) => {
      return {
        ...current(state),
        ...action.payload["auth"],
      };
    });
  },
});

export const getUser = (state: IAuthState) => state.user;
