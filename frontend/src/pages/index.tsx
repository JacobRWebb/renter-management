import { Navbar } from "@/components";
import { wrapper } from "@/store";
import { MiddlewareRunner } from "@/util/middleware";
import { unAuthorizedOnlyMiddleware } from "@/util/middleware/authMiddleware";
import type { NextPage } from "next";

const Index: NextPage = () => {
  return (
    <>
      <Navbar />
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => {
  return async (ctx) => {
    const middlewareRunner = new MiddlewareRunner(store, ctx);
    middlewareRunner.build([unAuthorizedOnlyMiddleware]);
    const res = await middlewareRunner.run();
    return res;
  };
});

export default Index;
