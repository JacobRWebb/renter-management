import { NextPage } from "next";
import Signin from "../components/form/Signin";
import Navbar from "../components/navbar";
import { wrapper } from "../store";

const signin: NextPage = () => {
  return (
    <div className="page">
      <Navbar />
      <Signin />
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
