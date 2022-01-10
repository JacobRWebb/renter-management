import { NextPage } from "next";
import { useRouter } from "next/router";

const NotFound: NextPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col h-3/4 items-center justify-center">
      <div className="flex flex-col items-center justify-center bg-white text-blue-800 rounded px-2 py-4">
        <h1 className="text-2xl mb-4  font-bold">
          Oops looks like this page does not exist
        </h1>
        <p
          onClick={() => {
            router.back();
          }}
          className="text-xl font-medium cursor-pointer border-b-2"
        >
          Click Here to return
        </p>
      </div>
    </div>
  );
};

export default NotFound;
