import { FunctionComponent } from "react";
import { User } from "../../store/userFeature";
import Avatar from "../common/Avatar";

const NavAvatar: FunctionComponent<{ user: User }> = ({ user }) => {
  return (
    <div className="relative flex h-8 w-8 justify-center items-center rounded-full overflow-hidden">
      <Avatar userId={user.id} />
    </div>
  );
};

export default NavAvatar;
