import Image from "next/image";
import { FunctionComponent } from "react";
import { User } from "../../store/userFeature";
import { API_URL } from "../../util/constants";

const ProfileContainer: FunctionComponent<{ user: User | null }> = ({
  user,
  children,
}) => {
  return (
    <div className="relative bg-white p-4 w-full mt-20 max-w-xl mx-auto transition-all rounded">
      <div className="absolute rounded-full overflow-hidden origin-center w-14 h-14 -top-7 left-1/2 -translate-x-1/2 bg-black">
        <Image
          alt="avatar"
          draggable={false}
          src={`${API_URL}/user/avatar/${user?.id}`}
          layout="fill"
        />
      </div>
      {children}
    </div>
  );
};

export default ProfileContainer;
