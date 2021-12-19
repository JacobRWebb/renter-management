import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { FunctionComponent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store";
import { authSlice } from "../../store/authSlice";
import AuthFormGroup from "./AuthFormGroup";

const Signin: FunctionComponent = () => {
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
    dispatch(authSlice.actions.setUser({ username }));
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
          Icon={<FontAwesomeIcon icon="user" className="inputIcon" />}
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
      </form>
    </div>
  );
};

export default Signin;