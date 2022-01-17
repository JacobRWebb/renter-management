import { NextPage } from "next";
import { Navbar } from "../../components";
import { wrapper } from "../../store";
import { axiosInstance } from "../../util/constants";
import { Middleware, MiddlewareRunner } from "../../util/middleware";
import { authorizedOnlyMiddleware } from "../../util/middleware/authMiddleware";
import { isBannedMiddleware } from "../../util/middleware/miscMiddleware";

const middlewareStack: Middleware[] = [
  authorizedOnlyMiddleware,
  isBannedMiddleware,
];

const Verify: NextPage = () => {
  const resendToken = () => {
    axiosInstance
      .post("/user/verify", {})
      .then((data) => {})
      .catch((err) => {});
  };
  return (
    <div className="h-full w-full">
      <Navbar />
      <div className="flex flex-col h-full items-center justify-center">
        <div className="flex flex-col bg-white rounded-lg p-4">
          <h1 className="font-semibold mb-2 text-custom-blue text-xl">
            Request Account Verification
          </h1>
          <p className="font-medium text-base">
            Please check your email for a link to verify your account
          </p>
          <button
            className="w-fit rounded-md bg-green-700 px-4 py-2 ml-auto mt-4 text-white"
            onClick={() => resendToken()}
          >
            Resend
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => {
  return async (ctx) => {
    const middlewareRunner = new MiddlewareRunner(store, ctx);
    middlewareRunner.build(middlewareStack);
    const res = await middlewareRunner.run();
    return res;
  };
});

export default Verify;
