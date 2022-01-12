import { Popover, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import React, { Fragment, FunctionComponent } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { useUser } from "../../util/hooks";
import NavLogo from "./NavLogo";
import NavUserSection from "./NavUserSection";

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
        <div className="hidden flex-row sm:flex items-center space-x-4">
          {/* Nav Items */}
          <NavUserSection user={user} />
        </div>
        <Popover.Button className="flex sm:hidden">
          <span className="sr-only">Open Navbar</span>
          <GiHamburgerMenu />
        </Popover.Button>
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
          as="div"
          className="absolute flex sm:hidden top-0 inset-x-0 origin-top-right w-full"
        >
          <div className="flex flex-col w-full m-4 p-2 bg-white rounded shadow-2xl border-2 border-gray-500 border-opacity-10">
            {/* Top Section pop up navbar */}
            <div className="flex flex-row w-full items-center justify-between">
              <NavUserSection user={user} />
              <Popover.Button className="flex items-center self-start justify-center sm:hidden w-8 h-8 bg-white rounded-md text-gray-200 hover:text-gray-400 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open Menu</span>
                <AiOutlineClose className="text-2xl text-black" />
              </Popover.Button>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default Navbar;
