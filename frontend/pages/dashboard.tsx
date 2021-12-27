import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navbar } from "../components/navbar";
import { useAppSelector, wrapper } from "../store";
import { checkToken } from "../util/preRun";

const Dashboard: NextPage<{ test: boolean }> = ({}) => {
  const dispatch = useDispatch();
  const authState = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!authState.user) {
      router.push("/signin");
    }
  }, [authState.user]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col p-4 m-4 bg-white rounded">
        <h1>Dashboard</h1>
      </div>
      <div className="flex flex-col p-4">
        <div className="bg-white flex flex-col snap-y max-h-[480px] overflow-auto">
          <div className="snap-start h-20 min-h-20 flex flex-col justify-between white border-y-2 border-custom-blue">
            <h1>Testing</h1>
            <p>Testing Lower</p>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => {
  return async (ctx) => {
    const token = ctx.req.cookies.token;
    if (token) {
      await checkToken(store, token);
      if (store.getState().auth.user) {
        return {
          props: {},
        };
      }
    }

    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  };
});

export default Dashboard;
