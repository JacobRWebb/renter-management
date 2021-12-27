import { useRouter } from "next/router";
import { FunctionComponent } from "react";

const NavLogo: FunctionComponent = () => {
  const router = useRouter();
  return (
    <h1
      className="cursor-pointer text-4xl font-bold"
      onClick={() => {
        router.push("/");
      }}
    >
      Xodius
    </h1>
  );
};

export default NavLogo;
