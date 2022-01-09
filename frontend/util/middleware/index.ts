import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  PreviewData,
} from "next";
import { ParsedUrlQuery } from "querystring";
import { AppStore } from "../../store";

export interface Middleware {
  (
    store: AppStore,
    ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
  ): Promise<GetServerSidePropsResult<any> | undefined>;
}

export class MiddlewareRunner {
  private store: AppStore;
  private ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>;

  constructor(
    store: AppStore,
    ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
    props: any = {}
  ) {
    this.store = store;
    this.ctx = ctx;
  }

  private middleware: Middleware[] = [];

  build = (middleware: Middleware[]) => {
    this.middleware.push(...middleware);
    return this;
  };

  run = async () => {
    let response: GetServerSidePropsResult<any> = {
      props: {},
    };

    for await (const m of this.middleware) {
      let res = await m(this.store, this.ctx);
      if (res !== undefined) {
        response = res;
        break;
      }
    }

    return response;
  };
}
