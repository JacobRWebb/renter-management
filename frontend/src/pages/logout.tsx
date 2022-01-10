import { NextPage } from "next";
import { wrapper } from "../store";

const Logout: NextPage = () => {
  return <div></div>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    ctx.res.setHeader("set-cookie", [
      "token=; Max-Age=0; Domain=localhost; Path=/; HttpOnly; SameSite=Strict",
    ]);
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
);

export default Logout;
