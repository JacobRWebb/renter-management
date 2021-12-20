import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { FunctionComponent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store";
import { authSlice } from "../../store/authSlice";
import { axiosInstance } from "../../util/constants";
import AuthFormGroup from "./AuthFormGroup";

const SigninForm: FunctionComponent = () => {
  const dispatch = useDispatch();
  const authState = useAppSelector((state) => state.auth);
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHidden, setPasswordHidden] = useState(true);

  useEffect(() => {
    router.prefetch("/");
    router.prefetch("/signup");
    router.prefetch("/dashboard");
  }, []);

  useEffect(() => {
    if (authState.user) {
      router.push("/dashboard");
    }
  }, [authState]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    <div className="authBase">
      <form className="authContainer" onSubmit={onSubmit}>
        <h1 className="authHeader">Sign in to your account</h1>

        <AuthFormGroup
          htmlFor="username"
          label="Username"
          autoComplete="username"
          value={username}
          onChangeCallback={(e) => {
            setUsername(e.target.value);
          }}
        />
        <AuthFormGroup
          htmlFor="password"
          label="Password"
          autoComplete="password"
          value={password}
          passwordHidden={passwordHidden}
          onChangeCallback={(e) => {
            setPassword(e.target.value);
          }}
          Icon={
            <FontAwesomeIcon
              focusable="true"
              onClick={() => {
                setPasswordHidden(!passwordHidden);
              }}
              className="inputIcon showPassword"
              icon={passwordHidden ? "eye" : "eye-slash"}
            />
          }
        />
        <button className="signinBtn">Sign in</button>
        {authState.error && <p>{authState.error}</p>}
      </form>
    </div>
  );
};

export default SigninForm;
