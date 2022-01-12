import { Navbar } from "@/components";
import ModuleTransition from "@/components/dashboard/ModuleTransition";
import PayDashModule from "@/components/dashboard/PayDashModule";
import YearlyExpenditureChart from "@/components/dashboard/YearlyExpenditureChart";
import { wrapper } from "@/store";
import { MiddlewareRunner } from "@/util/middleware";
import { authorizedOnlyMiddleware } from "@/util/middleware/authMiddleware";
import { isBannedMiddleware } from "@/util/middleware/miscMiddleware";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";

const Dashboard: NextPage<{ test: boolean }> = ({}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  });

  return (
    <>
      <Navbar />
      <div className="flex flex-col mx-auto justify-center items-center mt-16 px-4">
        <div className="grid grid-flow-row-dense w-full gap-4 max-w-7xl grid-cols-3 sm:grid-cols-4">
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
    middlewareRunner.build([authorizedOnlyMiddleware, isBannedMiddleware]);
    const res = await middlewareRunner.run();

    return res;
  };
});

export default Dashboard;
