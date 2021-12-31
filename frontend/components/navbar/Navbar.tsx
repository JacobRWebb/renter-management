import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import React, { Fragment, FunctionComponent } from "react";
import { useUser } from "../../util/hooks";
import Avatar from "../Avatar";
import Dropdown from "../common/Dropdown";
import DropdownItem from "../common/DropdownItem";
import NavItem from "./NavItem";
import NavLogo from "./NavLogo";

const Navbar: FunctionComponent = () => {
  const router = useRouter();
  const user = useUser();

  return (
    <Popover
      as="div"
      className="relative flex items-center justify-center bg-white"
    >
      <div className="flex flex-row justify-between items-center px-4 py-1 w-full max-w-7xl">
        <NavLogo />
        {user !== null ? (
          <>
            <Popover.Button className="flex items-center justify-center sm:hidden w-8 h-8 bg-white rounded-md text-gray-200 hover:text-gray-400 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open Menu</span>
              <FontAwesomeIcon icon={"bars"} />
            </Popover.Button>
            <div className="hidden flex-row items-center justify-center space-x-4 text-custom-blue sm:flex">
              <NavItem displayName="Dashboard" to="/dashboard" />
              <FontAwesomeIcon icon={"bell"} />
              <Dropdown
                displayNode={
                  <div className="flex flex-row items-center justify-center space-x-2 bg-gray-200 p-1 rounded-md">
                    <p className="font-medium">{user.name.firstName}</p>
                    <Avatar userId={user.id} />
                  </div>
                }
              >
                <DropdownItem displayName="Logout" to="/logout" />
              </Dropdown>
            </div>
          </>
        ) : (
          <button
            className="bg-green-700 text-white font-medium py-1 px-2 rounded-md"
            onClick={() => {
              router.push("/signin");
            }}
          >
            Sign In
          </button>
        )}
      </div>
      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute flex flex-col justify-start top-0 inset-x-0 transform origin-top-right w-full p-5 sm:hidden"
        >
          <div className="flex flex-col bg-white p-5 rounded-lg shadow-lg">
            {user !== null ? (
              <div className="flex flex-row items-center justify-between">
                <Avatar userId={user.id} />
                <Popover.Button className="flex items-center justify-center sm:hidden w-8 h-8 bg-white rounded-md text-gray-200 hover:text-gray-400 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open Menu</span>
                  <FontAwesomeIcon icon={"times"} />
                </Popover.Button>
              </div>
            ) : null}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default Navbar;
