import { useRouter } from "next/router";
import { FunctionComponent } from "react";

const NavItem: FunctionComponent<{
  displayName: string;
  to?: string;
}> = ({ displayName, to }) => {
  const router = useRouter();

  return (
    <button
      className={`group whitespace-nowrap outline-none font-medium h-full p-2 pb-1 cursor-pointer border-b-2 transition-all ${
        router.pathname === to ? "border-custom-blue" : "hover:border-blue-500"
      }`}
      onClick={() => {
        if (to) {
          router.push(to);
        }
      }}
    >
      {displayName}
    </button>
  );
};

export default NavItem;
