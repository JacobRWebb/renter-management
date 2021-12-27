import {
  DetailedHTMLProps,
  FunctionComponent,
  InputHTMLAttributes,
  ReactNode,
} from "react";

const InputField: FunctionComponent<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    icon?: ReactNode;
  }
> = ({ icon, ...inputProps }) => {
  return (
    <div className="flex flex-row items-center relative mb-8 border-b-2 border-gray-300 focus-within:border-custom-blue">
      <input
        className="peer h-10 w-full text-gray-900 placeholder-transparent focus:outline-none"
        {...inputProps}
      />
      <label
        htmlFor={inputProps.id}
        className="absolute select-none left-0 -top-4 text-gray-600 text-sm transition-all peer-autofill:text-gray-400 peer-autofill:-top-4 peer-autofill:text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-gray-600 peer-focus:text-sm"
      >
        {inputProps.placeholder}
      </label>
      {icon ? icon : <></>}
    </div>
  );
};

export default InputField;
