import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AuthFormGroup from "../components/form/AuthFormGroup";
import { useAppSelector, wrapper } from "../store";
import { authSlice } from "../store/authSlice";
import { axiosInstance } from "../util/constants";
import { checkToken } from "../util/preRun";

const Signup: NextPage = () => {
  const dispatch = useDispatch();
  const authState = useAppSelector((state) => state.auth);
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHidden, setPasswordHidden] = useState(true);

  useEffect(() => {
    if (authState.user) {
      router.push("/dashboard");
    }
  }, [authState]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axiosInstance
      .post("user/login", { username, password })
      .then((res) => {
        if (res.data.success) {
          router.push("/dashboard");
        } else {
          dispatch(authSlice.actions.setError(res.data.error));
        }
      })
      .catch((err) => {
        dispatch(authSlice.actions.setError("Network Error"));
      });
  };

  return (
    <div className="page-signin">
      <form className="form-auth" onSubmit={onSubmit}>
        <h1 className="form-header">Sign in to your account</h1>
        <AuthFormGroup
          label="Username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <AuthFormGroup
          label="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={passwordHidden ? "password" : "text"}
          Icon={
            <FontAwesomeIcon
              focusable="true"
              onClick={() => {
                setPasswordHidden(!passwordHidden);
              }}
              className="input-icon show-password-icon"
              icon={passwordHidden ? "eye" : "eye-slash"}
            />
          }
        />
        <button className="submit-btn">Signin</button>
        {authState.error && <p>{authState.error}</p>}
      </form>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => {
  return async (ctx) => {
    const token = ctx.req.cookies.token;
    if (token) {
      await checkToken(store, token);
    }

    if (store.getState().auth.user) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return {
      props: {},
    };
  };
});

export default Signup;
