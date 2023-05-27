import { FieldProps, Field } from "solid-form-handler";
import { Component, For, JSX, Show } from "solid-js";
import { tw } from "typewind";
import { CheckboxControl } from "@/shared/ui/controls-solid-form-handler/checkbox-control";

export type ButtonCbGroupComponentProps = FieldProps & {
  display?: "switch";
  label?: string;
  options?: Array<SelectableOption>;
  onChange?: JSX.DOMAttributes<HTMLInputElement>["onChange"];
  onBlur?: JSX.DOMAttributes<HTMLInputElement>["onBlur"];
  value?: Array<string | number>;
  triggers?: string[];
};

export const ButtonCbGroupComponent: Component<ButtonCbGroupComponentProps> = (
  props
) => {
  return (
    <Field
      {...props}
      mode="checkbox-group"
      render={(field) => (
        <div class={tw.form_control.my_4}>
          <Show when={props.label}>
            <label>{props.label}</label>
          </Show>
          <div
            class={tw.btn_group}
            classList={{ "is-invalid": field.helpers.error }}
          >
            <For each={props.options}>
              {(option, i) => (
                <CheckboxControl
                  {...field.props}
                  display={props.display}
                  id={`${field.props.id}-${i()}`}
                  label={option.title}
                  value={option.value}
                  error={field.helpers.error}
                  checked={field.helpers.isChecked(option.value)}
                />
              )}
            </For>
          </div>
          <Show when={field.helpers.error}>
            <div class={tw.text_error}>{field.helpers.errorMessage}</div>
          </Show>
        </div>
      )}
    />
  );
};
