import { NextPage } from "next";
import { useRouter } from "next/router";

const NotFound: NextPage = () => {
  const router = useRouter();

  return (
    <div className="page">
      <div className="notFoundPage">
        <h1
          onClick={() => {
            router.back();
          }}
        >
          Oops 404 - Click to go back!
        </h1>
      </div>
    </div>
  );
};

export default NotFound;
