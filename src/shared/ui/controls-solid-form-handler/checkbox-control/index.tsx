import { FieldProps, Field } from "solid-form-handler";
import { Component, JSX, Show, splitProps } from "solid-js";
import { tw } from "typewind";

export type CheckboxControlProps = Omit<
  JSX.InputHTMLAttributes<HTMLInputElement>,
  "type"
> &
  FieldProps & {
    label?: string;
    display?: "switch";
    uncheckedValue?: string | number;
  };

export const CheckboxControl: Component<CheckboxControlProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "classList",
    "label",
    "display",
    "uncheckedValue",
    "formHandler",
  ]);

  return (
    <Field
      {...props}
      mode="checkbox"
      render={(field) => (
        <div classList={local.classList}>
          <div
            class={tw.form_control}
            classList={{
              "is-invalid": field.helpers.error,
              "form-switch": local.display === "switch",
            }}
          >
            <label
              class={tw.label_text.flex.items_center.space_x_2.mr_4}
              for={field.props.id}
            >
              <input
                {...rest}
                {...field.props}
                class={tw.checkbox}
                type="checkbox"
                classList={{
                  "is-invalid": field.helpers.error,
                }}
              />
              <span>
                <Show when={local.label}>{local.label}</Show>
              </span>
            </label>
          </div>
          <Show when={field.helpers.error}>
            <div class={tw.text_error}>{field.helpers.errorMessage}</div>
          </Show>
        </div>
      )}
    />
  );
};
