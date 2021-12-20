import { NextPage } from "next";
import SigninForm from "../components/form/SigninForm";
import Navbar from "../components/navbar";
import { wrapper } from "../store";
import { checkToken } from "../util/preRun";

const signin: NextPage = () => {
  return (
    <div className="page">
      <Navbar />
      <SigninForm />
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => {
  return async (ctx) => {
    const token = ctx.req.cookies.token;

    if (token) {
      await checkToken(store, token);

      if (store.getState().auth.user) {
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
});

export default signin;
