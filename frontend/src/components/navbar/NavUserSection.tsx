import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";
import { User } from "../../store/userFeature";
import Dropdown from "../common/Dropdown";
import DropdownItem from "../common/DropdownItem";
import NavAvatar from "./NavAvatar";

const NavUserSection: FunctionComponent<{ user: User | null }> = ({ user }) => {
  const router = useRouter();

  if (user === null) {
    return (
      <div className="flex flex-row items-center space-x-3 sm:space-x-0">
        <h1 className="flex  font-medium sm:hidden">
          Looks like you are not signed in. Click here
        </h1>
        <button
          className="bg-green-700 text-white font-medium py-1 px-2 rounded-md w-fit"
          onClick={() => {
            router.push("/signin");
          }}
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-row w-full">
      <div className="flex flex-col space-y-3 w-full sm:hidden">
        <div className="flex flex-row items-center space-x-2">
          <NavAvatar user={user} />
          <p className="font-medium">
            {user.name.firstName} {user.name.lastName}
          </p>
        </div>
      </div>
      <div className="cursor-pointer hidden sm:flex">
        <Dropdown
          displayNode={
            <div className="flex flex-row items-center justify-center ring-blue-400 hover:ring-2 active:bg-gray-300 space-x-2 p-1 bg-gray-200 rounded-md">
              <NavAvatar user={user} />
              <p className="font-medium">
                {user.name.firstName} {user.name.lastName}
              </p>
              <HiOutlineChevronDown className="font-medium" />
              <span className="sr-only">Open user dropdown</span>
            </div>
          }
        >
          <DropdownItem displayName="Profile" to="/profile" />
          <DropdownItem displayName="Logout" to="/logout" />
        </Dropdown>
      </div>
    </div>
  );
};

export default NavUserSection;
