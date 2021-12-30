import { useRouter } from "next/router";
import { FunctionComponent } from "react";

const SigninButton: FunctionComponent = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/signin")}
      className="transition-all bg-green-600 text-white px-2 py-1 ring-inset ring-green-900 ring-opacity-25 hover:bg-green-500 hover:ring-2 sm:rounded hover:sm:shadow-lg"
    >
      Sign In
    </button>
  );
};

export default SigninButton;
