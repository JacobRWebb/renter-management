import { User } from "@/store/userFeature";
import { FunctionComponent } from "react";
import Avatar from "../Avatar";

const ProfileContainer: FunctionComponent<{ user: User | null }> = ({
  user,
  children,
}) => {
  return (
    <div className="relative bg-white p-4 w-full mt-20 max-w-xl mx-auto transition-all rounded">
      <div className="absolute rounded-full overflow-hidden origin-center w-14 h-14 -top-7 left-1/2 -translate-x-1/2 bg-black">
        <Avatar userId={user?.id} />
      </div>
      {children}
    </div>
  );
};

export default ProfileContainer;
