import { GetServerSidePropsContext } from "next";
import { AppStore } from "../store";
import { checkToken } from "../util/preRun";

export const authorizedOnly = async (
  store: AppStore,
  ctx: GetServerSidePropsContext
) => {
  const token = ctx.req.cookies.token;
  if (token) {
    await checkToken(store, token);
    if (store.getState().userState.user) {
      return {
        props: {},
      };
    }
  }

  return {
    redirect: {
      destination: "/signin",
      permanent: false,
    },
  };
};

export const nonAuthorized = async (
  store: AppStore,
  ctx: GetServerSidePropsContext
) => {
  const token = ctx.req.cookies.token;
  if (token) {
    await checkToken(store, token);
    if (store.getState().userState.user) {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
      };
    }
  }

  return {
    props: {},
  };
};
