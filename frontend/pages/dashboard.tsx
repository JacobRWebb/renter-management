import { NextPage } from "next";
import React from "react";
import { Navbar } from "../components/navbar";
import { authorizedOnly } from "../middleware/authMiddleware";
import { wrapper } from "../store";

const Dashboard: NextPage<{ test: boolean }> = ({}) => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col p-4 m-4 bg-white rounded">
        <h1>Dashboard</h1>
      </div>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => {
  return async (ctx) => {
    const middleware = await authorizedOnly(store, ctx);
    return middleware;
  };
});

export default Dashboard;
