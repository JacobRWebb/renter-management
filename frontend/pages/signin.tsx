import { NextPage } from "next";
import Signin from "../components/form/Signin";
import Navbar from "../components/navbar";

const signin: NextPage = () => {
  return (
    <div className="page">
      <Navbar />
      <Signin />
    </div>
  );
};

export default signin;
