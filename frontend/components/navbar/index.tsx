import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { FunctionComponent, useEffect, useState } from "react";
import { useAppSelector } from "../../store";

const Navbar: FunctionComponent = () => {
  const state = useAppSelector((state) => state);
  const router = useRouter();

  const [authPage, setAuthPage] = useState(false);

  useEffect(() => {
    if (router.pathname === "/signin" || router.pathname === "/register") {
      setAuthPage(true);
    } else {
      setAuthPage(false);
    }
  }, []);

  useEffect(() => {
    if (!state.auth.user) {
      router.prefetch("/signin");
    } else {
      router.prefetch("/dashboard");
    }
  }, [state.auth.user]);

  return (
    <div className="navbar">
      <h1
        className="logo"
        onClick={() => {
          if (window.location.pathname !== "/") {
            router.push("/");
          }
        }}
      >
        Xodius
      </h1>
      {state.auth.user && <button>{state.auth.user.username}</button>}
      {!authPage && !state.auth.user && (
        <button
          className="signin"
          onMouseOver={() => router.prefetch("/signin")}
          onClick={() => router.push("/signin")}
        >
          <p className="signinText">Signin</p>
          <FontAwesomeIcon className="signinArrow" icon={"arrow-right"} />
        </button>
      )}
    </div>
  );
};

export default Navbar;
