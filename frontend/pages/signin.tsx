import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import InputField from "../components/form/InputField";
import { useAppSelector, wrapper } from "../store";
import { axiosInstance } from "../util/constants";
import { checkToken } from "../util/preRun";

const Signup: NextPage = () => {
  const dispatch = useDispatch();
  const authState = useAppSelector((state) => state.auth);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (authState.user) {
      router.push("/dashboard");
    }
  }, [authState]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(undefined);
    axiosInstance
      .post("user/login", { email, password })
      .then((res) => {
        if (res.data.success) {
          router.push("/dashboard");
        } else {
          setLoading(false);
          setError(res.data.error);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  };

  return (
    <div className="flex h-full items-center justify-center">
      <form
        className="flex flex-col rounded bg-white px-10 py-5 shadow-lg"
        onSubmit={onSubmit}
      >
        <h1 className="w-full text-custom-blue text-center text-3xl font-medium mb-10">
          Sign in to your account
        </h1>
        <InputField
          id="email"
          placeholder="Email"
          type="email"
          autoComplete="email"
          onChange={(event) => {
            setEmail(event.currentTarget.value);
          }}
        />
        <InputField
          id="password"
          placeholder="Password"
          type={passwordHidden ? "password" : "text"}
          autoComplete="password"
          onChange={(event) => {
            setPassword(event.currentTarget.value);
          }}
          icon={
            <FontAwesomeIcon
              className="cursor-pointer"
              icon={passwordHidden ? "eye" : "eye-slash"}
              onClick={() => {
                setPasswordHidden(!passwordHidden);
              }}
            />
          }
        />
        <div className="flex flex-row items-center mb-3">
          {error ? (
            <div className="flex flex-row items-center text-red-500 cursor-default">
              <FontAwesomeIcon icon={"exclamation"} className="mr-2" />
              <p className="font-base">{error}</p>
            </div>
          ) : (
            <></>
          )}

          <button
            className={`flex flex-row items-center transition-all ${
              loading ? "bg-green-700" : "bg-custom-blue"
            } text-custom-cream px-4 py-2 rounded w-fit ml-auto hover:bg-green-700`}
            type="submit"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Trying
              </>
            ) : (
              <>Sign In</>
            )}
          </button>
        </div>
        <a className="hover:text-blue-600 cursor-pointer">
          Don't have an account? Click Here
        </a>
      </form>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => {
  return async (ctx) => {
    const token = ctx.req.cookies.token;
    if (token) {
      await checkToken(store, token);
    }

    if (store.getState().auth.user) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return {
      props: {},
    };
  };
});

export default Signup;
