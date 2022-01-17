import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { Middleware } from ".";
import { AppStore } from "../../store";

export const isBannedMiddleware: Middleware = async (
  store: AppStore,
  ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  const user = store.getState().userState.user;

  if (user === null) {
    return {
      redirect: {
        destination: "/sigin",
        permanent: false,
      },
    };
  }

  if (user.banned) {
    return {
      redirect: {
        destination: "/banned",
        permanent: false,
      },
    };
  }

  return undefined;
};

export const isVerified: Middleware = async (
  store: AppStore,
  ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  const user = store.getState().userState.user;

  if (user === null) {
    return {
      redirect: {
        destination: "/sigin",
        permanent: false,
      },
    };
  }

  if (user.verified) {
    return undefined;
  }

  return {
    redirect: {
      destination: "/account/verify",
      permanent: false,
    },
  };
};
