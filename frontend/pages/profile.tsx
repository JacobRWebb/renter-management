import { NextPage } from "next";
import { useState } from "react";
import Avatar from "../components/Avatar";
import { Navbar } from "../components/navbar";
import ProfileContainer from "../components/profile/ProfileContainer";
import { useAppSelector, wrapper } from "../store";
import { axiosInstance } from "../util/constants";
import { checkToken } from "../util/preRun";

const Profile: NextPage = () => {
  const state = useAppSelector((state) => state);
  const [selectedFile, setSelectedFile] = useState<File | null>();
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedFile && selectedFile !== null) {
      const formData = new FormData();
      formData.append("avatar", selectedFile);
      axiosInstance
        .post("user/avatar", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setSuccess(response.data.success);
        })
        .catch((err) => {
          setSuccess(false);
          setError(err.message);
        });
    }
  };

  if (state.auth.user === null) {
    return <></>;
  }

  return (
    <div className="flex flex-col h-full">
      <Navbar />
      <ProfileContainer user={state.auth.user}>
        <div className="flex justify-between w-full mt-3">
          <h1 className="font-medium">{state.auth.user.email}</h1>
          <h1 className="font-medium">Created ...</h1>
        </div>
        <div className="flex flex-col rounded p-4 bg-white shadow-lg">
          <form onSubmit={submit}>
            <h1>Change Profile Picture</h1>
            <div className="flex flex-row bg-white items-center justify-between">
              <Avatar userId={state.auth.user.id} />
              <input
                className="w-72"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const avatar = e.target.files?.[0];
                  setSelectedFile(avatar);
                }}
              />
              <button
                disabled={selectedFile === null || !selectedFile}
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
    const token = ctx.req.cookies.token;
    if (token) {
      await checkToken(store, token);
      if (store.getState().auth.user) {
        return {
          props: {},
        };
      }
    }

    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  };
});

export default Profile;
