import { Menu, Transition } from "@headlessui/react";
import { Fragment, FunctionComponent, ReactNode } from "react";

const Dropdown: FunctionComponent<{
  displayNode: ReactNode;
  rounded?: boolean;
  classNameExtend?: string;
}> = ({ displayNode, rounded = false, classNameExtend = "", children }) => {
  return (
    <Menu as="div" className={`relative ${classNameExtend}`}>
      <Menu.Button
        className={`flex flex-row items-center justify-center max-w-xs focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 ${
          rounded ? "rounded-full" : ""
        }`}
      >
        {displayNode}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-fit rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          {children}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Dropdown;
