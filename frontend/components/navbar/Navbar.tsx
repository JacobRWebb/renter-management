import React, { FunctionComponent } from "react";
import { useAppSelector } from "../../store";
import Avatar from "../Avatar";
import Dropdown from "../common/Dropdown";
import DropdownItem from "../common/DropdownItem";
import NavItem from "./NavItem";
import NavLogo from "./NavLogo";

const Navbar: FunctionComponent = () => {
  const store = useAppSelector((store) => store);

  return (
    <div className="flex flex-col select-none shadow-md text-custom-blue shadow-gray-800 bg-white p-2 w-full justify-between items-center md:flex-row">
      <NavLogo />
      <div className="flex flex-col items-center justify-center md:flex-row">
        {store.auth.user ? (
          <>
            <NavItem displayName="Dashboard" to="/dashboard" />
            <Dropdown
              rounded={true}
              classNameExtend="md:ml-4"
              displayNode={
                <>
                  <span className="sr-only">Open user menu</span>
                  <Avatar />
                </>
              }
            >
              <DropdownItem displayName="Profile" to="/profile" />
              <DropdownItem
                displayName="Logout"
                to="/logout"
                classNameExtend="text-red-500"
              />
            </Dropdown>
          </>
        ) : (
          <NavItem displayName="Sign In" to="/signin" />
        )}
      </div>
    </div>
  );
};

export default Navbar;
