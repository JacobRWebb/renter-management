import InputField from "@/components/form/InputField";
import { useAppSelector, wrapper } from "@/store";
import { loginByEmail } from "@/store/userFeature";
import { MiddlewareRunner } from "@/util/middleware";
import { unAuthorizedOnlyMiddleware } from "@/util/middleware/authMiddleware";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Signup: NextPage = () => {
  const dispatch = useDispatch();
  const state = useAppSelector((state) => state);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHidden, setPasswordHidden] = useState(true);

  const [showingEmail, setShowingEmail] = useState(false);

  useEffect(() => {
    router.prefetch("/dashboard");
    setShowingEmail(true);
  });

  useEffect(() => {
    if (state.userState.success) {
      router.push("/dashboard");
    }
  }, [state.userState]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginByEmail({ email, password }));
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
          error={state.userState.errors.email !== undefined}
          type="email"
          autoComplete="email"
          onChange={(event) => {
            setEmail(event.currentTarget.value);
          }}
        />
        <InputField
          id="password"
          placeholder="Password"
          error={state.userState.errors.password !== undefined}
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
          <div className="flex flex-col">
            {Object.entries(state.userState.errors).map(([key, value]) => {
              return (
                <div key={key} className="flex flex-col text-red-500 text-xs">
                  {value}
                </div>
              );
            })}
          </div>
          <button
            className={`flex flex-row items-center transition-all ${
              state.userState.pending || state.userState.success
                ? "bg-green-700"
                : "bg-custom-blue"
            } text-custom-cream px-4 py-2 rounded w-fit ml-auto hover:bg-green-700`}
            type="submit"
          >
            {state.userState.pending || state.userState.success ? (
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
    const middlewareRunner = new MiddlewareRunner(store, ctx);
    middlewareRunner.build([unAuthorizedOnlyMiddleware]);
    const res = await middlewareRunner.run();
    console.log(res);

    return res;
  };
});

export default Signup;
