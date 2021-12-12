import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector, wrapper } from "../store";

const Dashboard: NextPage = () => {
  const dispatch = useDispatch();
  const authState = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!authState.user) {
      router.push("/signin");
    }
  }, [authState.user]);

  return <div>Dashboard</div>;
};

export const getServerSideProps = wrapper.getServerSideProps((store) => {
  return async (ctx) => {
    return {
      props: {},
    };
  };
});

export default Dashboard;
