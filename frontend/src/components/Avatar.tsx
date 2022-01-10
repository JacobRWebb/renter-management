import clsx from "clsx";
import Image from "next/image";
import { FunctionComponent, useEffect, useState } from "react";
import { axiosInstance } from "../util/constants";

const Avatar: FunctionComponent<{ userId?: string }> = ({ userId }) => {
  const [avatar, setAvatar] = useState<string>(
    "https://res.cloudinary.com/xodius/image/upload/v1641802390/placeholder/Avatar-Placeholder.png"
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (userId == null) return;

    axiosInstance
      .get<{ avatarLink: string }>(`/user/avatar/${userId}`)
      .then((res) => {
        setAvatar(res.data.avatarLink);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  return (
    <div className={clsx(loading && "animate-pulse")}>
      <Image draggable={false} src={avatar} layout="fill" alt="avatar" />
    </div>
  );
};

export default Avatar;
