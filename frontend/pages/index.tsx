import type { NextPage } from "next";
import { Navbar } from "../components/navbar";
import { wrapper } from "../store";
import { checkToken } from "../util/preRun";

const Index: NextPage = () => {
  return (
    <>
      <Navbar />
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => {
  return async (ctx) => {
    const token = ctx.req.cookies.token;
    if (token) {
      await checkToken(store, token);
    }

    return {
      props: {},
    };
  };
});

export default Index;
