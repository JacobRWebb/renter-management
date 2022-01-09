import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import ModuleTransition from "../components/dashboard/ModuleTransition";
import PayDashModule from "../components/dashboard/PayDashModule";
import YearlyExpenditureChart from "../components/dashboard/YearlyExpenditureChart";
import { Navbar } from "../components/navbar";
import { wrapper } from "../store";
import { axiosInstance } from "../util/constants";
import { MiddlewareRunner } from "../util/middleware";
import { authorizedOnlyMiddleware } from "../util/middleware/authMiddleware";

const Dashboard: NextPage<{ test: boolean }> = ({}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  });

  const test = () => {
    axiosInstance
      .post("/stripe/createAccountLink", {})
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col mx-auto justify-center items-center mt-16 px-4">
        <div className="grid grid-flow-row-dense w-full gap-4 max-w-7xl grid-cols-3 sm:grid-cols-4">
          {/* <div className="col-span-full">
            <h1 className="text-2xl font-medium">Dashboard</h1>
          </div> */}
          <div className="overflow-hidden col-span-3 row-span-4">
            <ModuleTransition showing={loaded}>
              <YearlyExpenditureChart />
            </ModuleTransition>
          </div>
          <div className="row-start-1 sm:row-start-auto row-span-1 col-span-2 sm:row-span-1 sm:col-span-1">
            <ModuleTransition showing={loaded}>
              <PayDashModule />
            </ModuleTransition>
          </div>
          <div className="row-span-1 col-span-1">
            <ModuleTransition showing={loaded}>
              <div className="flex flex-col p-4 h-full bg-white rounded">
                <h1>Current Work Orders</h1>
                <button onClick={() => test()}>Test</button>
              </div>
            </ModuleTransition>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => {
  return async (ctx) => {
    const middlewareRunner = new MiddlewareRunner(store, ctx);
    middlewareRunner.build([authorizedOnlyMiddleware]);
    const res = await middlewareRunner.run();

    return res;
  };
});

export default Dashboard;
