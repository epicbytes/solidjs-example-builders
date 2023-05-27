import { FieldProps, Field } from "solid-form-handler";
import { Component, JSX, Show, splitProps } from "solid-js";
import { tw } from "typewind";

export type SelectPathControlProps = JSX.InputHTMLAttributes<HTMLInputElement> &
  FieldProps & { label?: string };

export const SelectPathControl: Component<SelectPathControlProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "classList",
    "label",
    "formHandler",
  ]);

  return (
    <Field
      {...props}
      mode="input"
      render={(field) => (
        <div classList={local.classList} class={tw.w_full.mb_4}>
          <Show when={local.label}>
            <label class={tw.label} for={field.props.id}>
              {local.label}
            </label>
          </Show>
          <input
            {...rest}
            spellcheck={false}
            {...field.props}
            class={tw.input.input_bordered.input_sm.w_full}
            classList={{
              "is-invalid": field.helpers.error,
              "form-control": true,
            }}
          />
          <Show when={field.helpers.error}>
            <div class={tw.text_error}>{field.helpers.errorMessage}</div>
          </Show>
        </div>
      )}
    />
  );
};
