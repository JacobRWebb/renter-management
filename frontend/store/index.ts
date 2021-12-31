import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { combineReducers } from "redux";
import { userSlice } from "./userFeature";

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
});

const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;

export const wrapper = createWrapper<AppStore>(makeStore);
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
