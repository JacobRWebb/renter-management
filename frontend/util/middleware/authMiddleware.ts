import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { Middleware } from ".";
import { AppStore } from "../../store";
import { User, userSlice } from "../../store/userFeature";
import { axiosInstance } from "../constants";

export const checkToken = async (
  store: AppStore,
  ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  const token = ctx.req.cookies.token;
  if (token === null || token === undefined) {
    throw new Error("No token found");
  }
  const response = await axiosInstance.post<{ user?: User }>(
    "user/preFetchUser",
    { token }
  );
  if (response.data.user) {
    store.dispatch(userSlice.actions.setUser(response.data.user));
  }
};

export const authorizedOnlyMiddleware: Middleware = async (
  store: AppStore,
  ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  try {
    await checkToken(store, ctx);
    if (store.getState().userState.user) {
      return {
        props: {},
      };
    }

    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }
};

export const unAuthorizedOnlyMiddleware: Middleware = async (
  store: AppStore,
  ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  try {
    await checkToken(store, ctx);
    if (store.getState().userState.user) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  } catch (error) {
    return undefined;
  }
  return undefined;
};
