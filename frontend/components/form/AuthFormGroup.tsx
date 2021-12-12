import { ChangeEvent, FunctionComponent } from "react";

const AuthFormGroup: FunctionComponent<{
  label: string;
  htmlFor: string;
  value: string;
  onChangeCallback: (e: ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string | undefined;
  passwordHidden?: boolean;
}> = ({
  label,
  htmlFor,
  value,
  onChangeCallback,
  autoComplete = "",
  passwordHidden = false,
  children,
}) => {
  return (
    <div className="authGroup">
      <label className="authLabel" htmlFor={htmlFor}>
        {label}
      </label>
      <div className="inputGroup">
        <input
          id={htmlFor}
          className="authInput"
          type={passwordHidden ? "password" : "text"}
          autoComplete={autoComplete}
          value={value}
          onChange={onChangeCallback}
        />
        {children}
      </div>
    </div>
  );
};

export default AuthFormGroup;
