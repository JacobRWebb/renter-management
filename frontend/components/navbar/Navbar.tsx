import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import { useAppSelector } from "../../store";

const Navbar: FunctionComponent = () => {
  const store = useAppSelector((store) => store);
  const router = useRouter();

  const [menuItems, setMenuItems] = useState<ReactNode[]>([]);

  useEffect(() => {
    const items: ReactNode[] = determineMenuItems();
    if (items.length !== menuItems.length) {
      setMenuItems(items);
    }
  });

  const determineMenuItems = (): ReactNode[] => {
    if (store.auth.user) {
      return [
        <div
          className="nav-primary__menu__item"
          key="Dashboard"
          onClick={() => {
            if (window.location.pathname !== "/dashboard") {
              router.push("/dashboard");
            }
          }}
        >
          Dashboard
        </div>,
      ];
    } else {
      return [
        <div
          key="signinMenu"
          className="nav-primary__menu__signin"
          onClick={() => router.push("/signin")}
        >
          <p className="nav-primary__menu__signin-text">Signin</p>
          <FontAwesomeIcon
            className="nav-primary__menu__signin-arrow"
            icon={"arrow-right"}
          />
        </div>,
      ];
    }
  };

  return (
    <div className="nav-primary">
      <h1
        className="nav-primary__title"
        onClick={() => {
          if (window.location.pathname !== "/") {
            router.push("/");
          }
        }}
      >
        Xodius
      </h1>
      <div className="nav-primary__menu">{menuItems}</div>
    </div>
  );
};

export default Navbar;
