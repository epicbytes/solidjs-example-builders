import { FieldProps, Field } from "solid-form-handler";
import {
  Component,
  createEffect,
  createSignal,
  For,
  JSX,
  Show,
  splitProps,
} from "solid-js";
import { tw } from "typewind";

export type SelectControlProps = JSX.SelectHTMLAttributes<HTMLSelectElement> &
  FieldProps & {
    label?: string;
    options?: Array<SelectableOption>;
    placeholder?: string;
    hasDefaultOption?: boolean;
  };

export const SelectControl: Component<SelectControlProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "placeholder",
    "options",
    "label",
    "classList",
    "class",
    "formHandler",
  ]);
  const [options, setOptions] = createSignal<SelectableOption[]>([]);

  /**
   * Computes the select options by using the placeholder and options props.
   */
  createEffect(() => {
    setOptions(() => [
      ...(local.placeholder ? [{ value: "", title: local.placeholder }] : []),
      ...(local.options || []),
    ]);
  });

  return (
    <Field
      {...props}
      mode="input"
      render={(field) => (
        <div class={tw.form_control.mb_4} classList={local.classList}>
          <Show when={local.label}>
            <label class={tw.label} for={field.props.id}>
              {local.label}
            </label>
          </Show>
          <select
            {...rest}
            {...field.props}
            class={tw.select.select_sm.select_bordered}
            classList={{ "is-invalid": field.helpers.error }}
          >
            <Show when={props.hasDefaultOption}>
              <option> --- </option>
            </Show>
            <For each={options()}>
              {(option) => (
                <option
                  value={option.value}
                  selected={option.value == field.props.value}
                >
                  {option.title}
                </option>
              )}
            </For>
          </select>
          <Show when={field.helpers.error}>
            <div class={tw.text_error}>{field.helpers.errorMessage}</div>
          </Show>
        </div>
      )}
    />
  );
};
