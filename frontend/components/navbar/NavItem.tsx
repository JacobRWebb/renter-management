import { useRouter } from "next/router";
import { FunctionComponent, useEffect, useState } from "react";

const NavItem: FunctionComponent<{
  displayName: string;
  to?: string;
}> = ({ displayName, to }) => {
  const router = useRouter();
  const [current, setCurrent] = useState(false);

  useEffect(() => {
    setCurrent(router.pathname === to);
  });

  return (
    <div
      onClick={() => {
        if (to) {
          router.push(to);
        }
      }}
      className={`group whitespace-nowrap  font-medium h-full p-2 pb-1 cursor-pointer border-b-2 transition-all ${
        current ? "border-custom-blue" : "hover:border-blue-500"
      }`}
    >
      <p
        className={`h-full transition-all ${
          current
            ? "text-custom-blue font-bold"
            : "text-gray-500 group-hover:text-blue-500"
        }`}
      >
        {displayName}
      </p>
    </div>
  );
};

export default NavItem;
