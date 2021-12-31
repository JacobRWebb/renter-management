import {
  DetailedHTMLProps,
  FunctionComponent,
  InputHTMLAttributes,
  ReactNode,
} from "react";

const InputField: FunctionComponent<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    icon?: ReactNode;
    error?: boolean;
  }
> = ({ icon, error = false, ...inputProps }) => {
  return (
    <div
      className={`flex flex-row items-center relative mb-8 border-b-2 ${
        error ? "border-red-600 animate-wiggle" : "border-gray-300"
      } focus-within:border-custom-blue`}
    >
      <input
        className="peer h-10 w-full text-gray-900 placeholder-transparent focus:outline-none"
        {...inputProps}
      />
      <label
        htmlFor={inputProps.id}
        className={`absolute select-none left-0 -top-4 ${
          error
            ? "text-red-600 peer-autofill:text-red-600 peer-placeholder-shown:text-red-600 peer-focus:text-red-600"
            : "text-gray-600 peer-autofill:text-gray-400 peer-placeholder-shown:text-gray-400 peer-focus:text-gray-400"
        } text-sm transition-all peer-autofill:-top-4 peer-autofill:text-sm peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-sm`}
      >
        {inputProps.placeholder}
      </label>
      {icon ? icon : <></>}
    </div>
  );
};

export default InputField;
