import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export interface IUser {
  id: string;
  username: string;
}

export interface IAuthState {
  user: IUser | null;
  error: string | null;
}

const defaultAuthState: IAuthState = {
  user: null,
  error: null,
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
    setError: (state, action: PayloadAction<string>) => {
      return {
        ...current(state),
        error: action.payload,
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
