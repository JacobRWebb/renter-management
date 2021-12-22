import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector, wrapper } from "../store";
import { Role } from "../store/authSlice";
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

  if (!authState.user) {
    return <></>;
  }

  const user = authState.user;

  return (
    <div className="page">
      <div className="dashboard">
        {user.roles.includes(Role.OWNER) && (
          <div className="ownedProperties">
            <h1 className="propertiesHeader">Owned Properties</h1>
            {user.ownedProperty.map((property, index) => {
              return (
                <div className="property" key={index}>
                  {property.name} - {property.address}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
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
