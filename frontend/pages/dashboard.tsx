import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navbar } from "../components/navbar";
import { useAppSelector, wrapper } from "../store";
import { axiosInstance } from "../util/constants";
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

  const test = () => {
    axiosInstance
      .post("stripe/GetStripeAccount")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col p-4 m-4 bg-white rounded">
        <h1>Dashboard</h1>
        <button onClick={test}>Test</button>
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
