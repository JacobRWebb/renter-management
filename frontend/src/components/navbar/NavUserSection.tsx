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
      <button
        className="bg-green-700 text-white font-medium py-1 px-2 rounded-md"
        onClick={() => {
          router.push("/signin");
        }}
      >
        Sign In
      </button>
    );
  }

  return (
    <div className="flex flex-row cursor-pointer">
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
  );
};

export default NavUserSection;
