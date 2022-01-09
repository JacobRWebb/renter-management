import moment from "moment";
import { FunctionComponent, useState } from "react";

const PayDashModule: FunctionComponent = () => {
  const [fetching, setFetching] = useState(false);

  return (
    <div className="flex flex-col transition-all bg-white rounded p-4">
      {fetching ? (
        <div className="space-y-2 animate-pulse">
          <div className="bg-gray-200 w-56 h-4 rounded"></div>
          <div className="bg-gray-200 w-32 h-4 rounded"></div>
          <div className="flex flex-col justify-end">
            <button
              className="w-fit px-4 py-1 bg-blue-600 text-white rounded flex-1 ml-auto"
              disabled
            >
              Pay Bill
            </button>
          </div>
        </div>
      ) : (
        <div className="">
          <h1 className="text-xl font-bold  text-gray-600">Next Bill</h1>
          <p className="font-medium text-gray-800">
            $1956.00 (Due on {moment().add(15, "day").format("MMMM Do YYYY")})
          </p>
          <div className="flex flex-col justify-end mt-2">
            <button className="w-fit px-4 py-1 bg-blue-800 text-white rounded flex-1 ml-auto">
              Pay Bill
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayDashModule;
