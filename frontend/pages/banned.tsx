import { NextPage } from "next";

const Banned: NextPage = () => {
  return (
    <div className="flex h-full w-full bg-white items-center justify-center">
      <div className="flex flex-col space-y-3 px-5 py-2 bg-gray-200 rounded">
        <h1 className="font-bold text-2xl">You have been banned</h1>

        <p className="font-medium">
          If you think this is a mistake please contact
          <span
            className="relative ml-2 select-all font-normal bg-gray-500 hover:bg-gray-600 p-1 rounded text-gray-200 hover:text-gray-50"
            onClick={() => {
              navigator.clipboard.writeText("admin@xodius.io");
            }}
          >
            admin@xodius.io
          </span>
        </p>
      </div>
    </div>
  );
};

export default Banned;
