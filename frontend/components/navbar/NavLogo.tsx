import { useRouter } from "next/router";
import { FunctionComponent } from "react";

const NavLogo: FunctionComponent = () => {
  const router = useRouter();
  return (
    <div className="flex justify-start w-0 flex-1">
      <h1
        className="cursor-pointer text-4xl font-bold"
        onClick={() => {
          router.push("/");
        }}
      >
        Xodius
      </h1>
    </div>
  );
};

export default NavLogo;
