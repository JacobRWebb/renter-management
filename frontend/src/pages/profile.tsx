import { NextPage } from "next";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Navbar } from "../components/navbar";
import ProfileContainer from "../components/profile/ProfileContainer";
import { useAppSelector, wrapper } from "../store";
import { changeAvatar } from "../store/userFeature";
import { MiddlewareRunner } from "../util/middleware";
import { authorizedOnlyMiddleware } from "../util/middleware/authMiddleware";

const Profile: NextPage = () => {
  const dispatch = useDispatch();
  const state = useAppSelector((state) => state);
  const [avatar, setAvatar] = useState<File | null>(null);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state.userState.user !== null && avatar !== null) {
      dispatch(changeAvatar({ avatar }));
    }
  };

  if (state.userState.user === null) {
    return <div>Error</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <Navbar />
      <ProfileContainer user={state.userState.user}>
        <div className="flex justify-between w-full mt-3">
          <h1 className="font-medium">{state.userState.user.email}</h1>
          <h1 className="font-medium">Created ...</h1>
        </div>
        <div className="flex flex-col rounded p-4 bg-white shadow-lg">
          <form onSubmit={submit}>
            <h1>Change Profile Picture</h1>
            <div className="flex flex-row bg-white items-center justify-between">
              {/* <Avatar userId={state.userState.user.id} /> */}
              <input
                className="w-72"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const avatar = e.target.files?.[0];
                  if (avatar) {
                    setAvatar(avatar);
                  }
                }}
              />
              <button
                disabled={avatar === null}
                className="border-2 rounded p-1 bg-blue-900 text-white disabled:opacity-50"
              >
                Change Avatar
              </button>
            </div>
          </form>
        </div>
      </ProfileContainer>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => {
  return async (ctx) => {
    const middlewareRunner = new MiddlewareRunner(store, ctx);
    middlewareRunner.build([authorizedOnlyMiddleware]);
    const res = await middlewareRunner.run();

    return res;
  };
});

export default Profile;
