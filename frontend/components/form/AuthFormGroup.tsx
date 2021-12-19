import { ChangeEvent, FunctionComponent, ReactNode } from "react";

const AuthFormGroup: FunctionComponent<{
  label: string;
  htmlFor: string;
  value: string;
  onChangeCallback: (e: ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  passwordHidden?: boolean;
  Icon?: ReactNode;
}> = ({
  label,
  htmlFor,
  value,
  onChangeCallback,
  autoComplete = "",
  passwordHidden = false,
  Icon,
}) => {
  return (
    <>
      <label className="authLabel" htmlFor={htmlFor}>
        {label}
      </label>
      <div className="inputContainer">
        <input
          id={htmlFor}
          className="authInput"
          type={passwordHidden ? "password" : "text"}
          autoComplete={autoComplete}
          value={value}
          onChange={onChangeCallback}
        />
        {Icon}
      </div>
    </>
  );
};

export default AuthFormGroup;
