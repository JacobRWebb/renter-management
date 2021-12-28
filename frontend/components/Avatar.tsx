import Image from "next/image";
import { FunctionComponent } from "react";
import { API_URL } from "../util/constants";

const Avatar: FunctionComponent<{ userId: string }> = ({ userId }) => {
  return (
    <div className="flex justify-center items-center rounded-full">
      <Image
        className="rounded-full"
        draggable={false}
        src={`${API_URL}/user/avatar/${userId}`}
        height={40}
        width={40}
        alt="avatar"
      />
    </div>
  );
};

export default Avatar;
