import { NextPage } from "next";
import SigninForm from "../components/form/SigninForm";
import Navbar from "../components/navbar";
import { wrapper } from "../store";

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
    return {
      props: {},
    };
  };
});

export default signin;
