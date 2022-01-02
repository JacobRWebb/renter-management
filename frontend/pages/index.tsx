import type { NextPage } from "next";
import { Navbar } from "../components/navbar";
import { nonAuthorized } from "../middleware/authMiddleware";
import { wrapper } from "../store";

const Index: NextPage = () => {
  return (
    <>
      <Navbar />
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => {
  return async (ctx) => {
    const middleware = await nonAuthorized(store, ctx);
    return middleware;
  };
});

export default Index;
