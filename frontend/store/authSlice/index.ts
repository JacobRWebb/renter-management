import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export enum Role {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  USER = "USER",
  TECHNICIAN = "TECHNICIAN",
}

export interface IProperty {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  ownerId: string;
}

export interface IUser {
  id: string;
  username: string;
  roles: Role[];
  email: string;
  createdAt: string;
  ownedProperty: IProperty[];
  rentedProperty: IProperty[];
  workedProperty: IProperty[];
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
        ...action.payload,
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
