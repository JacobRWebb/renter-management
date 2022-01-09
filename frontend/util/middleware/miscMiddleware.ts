import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { Middleware } from ".";
import { AppStore } from "../../store";
import { axiosInstance } from "../constants";

export const isBannedMiddleware: Middleware = async (
  store: AppStore,
  ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  //  TODO hook into a function that does not exist yet and use that response.
  //  TODO this is a temporary solution
  try {
    const response = await axiosInstance.get(
      `user/isBanned${store.getState().userState.user?.id}`
    );

    if (response.data.banned) {
      return {
        redirect: {
          destination: "/banned",
          permanent: false,
        },
      };
    }
  } catch (error) {
    return undefined;
  }
  return undefined;
};
