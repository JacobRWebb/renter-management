import { useRouter } from "next/router";
import { FunctionComponent } from "react";

const Navbar: FunctionComponent = () => {
  const router = useRouter();

  return (
    <div className="navbar">
      <h1 className="logo">Xodius</h1>
      <button
        className="signin"
        onMouseOver={() => router.prefetch("/signin")}
        onClick={() => router.push("/signin")}
      >
        <p className="signinText">Signin</p>
        <span className="signinArrow">&#8239;</span>
      </button>
    </div>
  );
};

export default Navbar;
