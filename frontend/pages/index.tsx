import type { NextPage } from "next";
import Navbar from "../components/navbar";

const Index: NextPage = () => {
  return (
    <>
      <div className="page">
        <Navbar />
      </div>
      <div className="footer">
        <p>Xodius INC Copyright </p>
      </div>
    </>
  );
};

export default Index;
