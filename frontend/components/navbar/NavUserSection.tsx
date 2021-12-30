import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent } from "react";
import { IUser } from "../../store/authSlice";
import Avatar from "../Avatar";
import Dropdown from "../common/Dropdown";
import DropdownItem from "../common/DropdownItem";
import SigninButton from "../form/SigninButton";

const NavUserSection: FunctionComponent<{ user: IUser | null }> = ({
  user,
}) => {
  return (
    <div className="flex flex-row items-center justify-between space-x-4">
      {user ? (
        <>
          <FontAwesomeIcon icon={"bell"} />
          <Dropdown
            rounded={true}
            displayNode={
              <>
                <span className="sr-only">Open user menu</span>
                <Avatar userId={user.id} />
              </>
            }
          >
            <DropdownItem displayName="Profile" to="/profile" />
            <DropdownItem displayName="Logout" to="/logout" warning={true} />
          </Dropdown>
        </>
      ) : (
        <SigninButton />
      )}
    </div>
  );
};

export default NavUserSection;
