import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover, Transition } from "@headlessui/react";
import React, { Fragment, FunctionComponent } from "react";
import { AppState, useAppSelector } from "../../store";
import Avatar from "../Avatar";
import SigninButton from "../form/SigninButton";
import NavItem from "./NavItem";
import NavLogo from "./NavLogo";
import NavUserSection from "./NavUserSection";

const Navbar: FunctionComponent = () => {
  const state = useAppSelector((state) => state);

  return (
    <Popover className="relative bg-white select-none text-custom-blue">
      <PrimaryNavbar state={state} />
      <PopupNavbar state={state} />
    </Popover>
  );
};

const PrimaryNavbar: FunctionComponent<{ state: AppState }> = ({ state }) => {
  return (
    <div className="flex justify-between items-center sm:justify-start sm:space-x-10 max-w-7xl mx-auto px-4 py-2">
      <NavLogo />
      <div className="-mr-2 -my-2 sm:hidden">
        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
          <span className="sr-only">Open menu</span>
          <FontAwesomeIcon
            className="h-6 w-6"
            aria-hidden="true"
            icon={"bars"}
          />
        </Popover.Button>
      </div>

      {state.userState.user !== null ? (
        <div className="hidden sm:flex space-x-4">
          <NavItem displayName="Dashboard" to="/dashboard" />
          <NavItem displayName="Contacts" to="/contacts" />
        </div>
      ) : (
        <></>
      )}
      <div className="hidden sm:flex items-center justify-end sm:flex-1 lg:w-0 space-x-4">
        <NavUserSection user={state.userState.user} />
      </div>
    </div>
  );
};

const PopupNavbar: FunctionComponent<{ state: AppState }> = ({ state }) => {
  return (
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
        className="absolute flex flex-col justify-start rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white top-0 inset-x-0 m-2 transition transform origin-top-right sm:hidden"
      >
        <div className="flex flex-col w-full pt-5 pb-6 px-5 divide-y-2 space-y-2">
          <div className="flex flex-row items-center justify-between">
            {state.userState.user !== null ? (
              <Avatar userId={state.userState.user.id} />
            ) : null}
            <Popover.Button>
              <div className="bg-white rounded p-2 inline-flex items-center justify-center text-gray-400 ">
                <span className="sr-only">Close menu</span>
                <FontAwesomeIcon icon={"times"} />
              </div>
            </Popover.Button>
          </div>
          {state.userState.user !== null ? (
            <>
              <div className="pt-1 flex flex-col">
                <NavItem displayName="Dashboard" to="/dashboard" />
                <NavItem displayName="Contacts" to="/contacts" />
                <NavItem displayName="Logout" to="/logout" />
              </div>
            </>
          ) : (
            <>
              <div className="pt-1 flex flex-col">
                <SigninButton />
              </div>
            </>
          )}
        </div>
      </Popover.Panel>
    </Transition>
  );
};

export default Navbar;
