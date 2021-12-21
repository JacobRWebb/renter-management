import {
  DetailedHTMLProps,
  FunctionComponent,
  InputHTMLAttributes,
  ReactNode,
} from "react";

const AuthFormGroup: FunctionComponent<
  Partial<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  > & {
    label: string;
    Icon?: ReactNode;
  }
> = ({ label, id, Icon, ...inputProps }) => {
  return (
    <div className="input-group">
      <label className="input-label" htmlFor={id}>
        {label}
      </label>

      <div className="input-field">
        <input autoComplete={id} {...inputProps} />
        {Icon}
      </div>
    </div>
  );
};

export default AuthFormGroup;
