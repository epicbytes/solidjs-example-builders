import { FieldProps, Field } from "solid-form-handler";
import { Component, JSX, splitProps } from "solid-js";

export type HiddenControlProps = JSX.InputHTMLAttributes<HTMLInputElement> &
  FieldProps & { label?: string };

export const HiddenControl: Component<HiddenControlProps> = (props) => {
  const [local, rest] = splitProps(props, ["formHandler"]);

  return (
    <Field
      {...props}
      mode="input"
      render={(field) => <input type={"hidden"} {...rest} {...field.props} />}
    />
  );
};
