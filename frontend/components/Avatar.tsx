import Image from "next/image";
import { FunctionComponent } from "react";
import { API_URL } from "../util/constants";

const Avatar: FunctionComponent<{ userId: string }> = ({ userId }) => {
  return (
    <div className="relative flex h-8 w-8 justify-center items-center rounded-full overflow-hidden">
      <Image
        draggable={false}
        src={`${API_URL}/user/avatar/${userId}`}
        layout="fill"
        alt="avatar"
      />
    </div>
  );
};

export default Avatar;
