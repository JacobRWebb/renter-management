import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { changeAvatar, loginByEmail, User } from ".";
import { Errors } from "../commonInterfaces";

interface UserState {
  user: User | null;
  pending: boolean;
  errors: Errors;
  success: boolean;
}

const initialUserState: UserState = {
  user: null,
  pending: false,
  errors: {},
  success: false,
};

const userSlice = createSlice({
  name: "userState",
  initialState: initialUserState,
  reducers: {
    setUser: (state, action) => {
      return {
        ...state,
        user: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: any) => {
      return {
        ...state,
        ...action.payload.userState,
      };
    });

    builder
      .addCase(loginByEmail.pending, (state, action) => {
        return {
          user: null,
          pending: true,
          errors: {},
          success: false,
        };
      })
      .addCase(loginByEmail.fulfilled, (state, action) => {
        return {
          ...state,
          pending: false,
          success: true,
        };
      })
      .addCase(loginByEmail.rejected, (state, action) => {
        return {
          user: null,
          pending: false,
          errors: action.payload ? action.payload.errors : {},
          success: false,
        };
      });

    builder
      .addCase(changeAvatar.pending, (state, action) => {
        if (state.user) {
          return {
            ...state,
            user: {
              ...state.user,
              avatar: {
                ...state.user.avatar,
                pending: true,
              },
            },
          };
        } else {
          return { ...state };
        }
      })
      .addCase(changeAvatar.fulfilled, (state, action) => {
        if (state.user) {
          return {
            ...state,
            user: {
              ...state.user,
              avatar: {
                ...state.user.avatar,
                pending: false,
              },
            },
          };
        } else {
          return { ...state };
        }
      })
      .addCase(changeAvatar.rejected, (state, action) => {
        if (state.user) {
          return {
            ...state,
            user: {
              ...state.user,
              avatar: {
                ...state.user.avatar,
                pending: false,
              },
            },
          };
        } else {
          return { ...state };
        }
      });
  },
});

export default userSlice;
