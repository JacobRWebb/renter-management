import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
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
    setUser: (state: Draft<IAuthState>, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (
      state: Draft<IAuthState>,
      action: PayloadAction<IAuthState>
    ) => {
      console.log(state);
      console.log(action);
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const getUser = (state: IAuthState) => state.user;
