import { Transition } from "@headlessui/react";
import { FunctionComponent } from "react";

const ModuleTransition: FunctionComponent<{ showing: boolean }> = ({
  showing,
  children,
}) => {
  return (
    <Transition
      as="div"
      className="flex flex-col"
      enter="transition ease-out duration-1000"
      enterFrom="transform opacity-0 scale-75"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
      show={showing}
    >
      {children}
    </Transition>
  );
};

export default ModuleTransition;
