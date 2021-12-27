import Image from "next/image";
import { FunctionComponent } from "react";

const Avatar: FunctionComponent = () => {
  return (
    <div className="flex justify-center items-center rounded-full">
      <Image
        className="rounded-full"
        draggable={false}
        src="http://placehold.it/200x200"
        height={40}
        width={40}
      />
    </div>
  );
};

export default Avatar;
