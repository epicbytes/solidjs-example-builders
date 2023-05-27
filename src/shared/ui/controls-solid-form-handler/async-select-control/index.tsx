import { FieldProps, Field } from "solid-form-handler";
import {
  Component,
  createEffect,
  createResource,
  createSignal,
  For,
  JSX,
  on,
  Show,
  splitProps,
} from "solid-js";
import { tw } from "typewind";
import * as AppMethod from "@/fake-api";
import { getValidationSchema } from "@/shared/utils/validation-schema";

export type AsyncSelectControlProps =
  JSX.SelectHTMLAttributes<HTMLSelectElement> &
    FieldProps & {
      label?: string;
      options?: Array<SelectableOption>;
      placeholder?: string;
      hasDefaultOption?: boolean;
      api?: any;
    };

export const AsyncSelectControl: Component<AsyncSelectControlProps> = (
  props
) => {
  const [local, rest] = splitProps(props, [
    "placeholder",
    "label",
    "classList",
    "class",
    "formHandler",
    "api",
  ]);
  const [options, setOptions] = createSignal<SelectableOption[]>([]);
  const [data, { refetch }] = createResource(() => {
    if (typeof local.api?.getModel === "string") {
      return local.api.getModel ? AppMethod[local.api.getModel]?.() : [];
    }
    try {
      if (
        Array.isArray(local.api.getModel?.validation) &&
        local.api.getModel.validation.length > 0
      ) {
        getValidationSchema(local.api.getModel.validation).validateSync({});
      }
      console.log("loading data");
      return AppMethod[local.api.getModel.name]?.();
    } catch (e) {
      console.log(e);
      return [];
    }
  });

  /**
   * Computes the select options by using the placeholder and options props.
   */
  createEffect(
    on(
      () => [data()],
      () => {
        setOptions(() => [
          ...(local.placeholder
            ? [{ value: "", title: local.placeholder }]
            : []),
          ...(data()?.items?.map((item) => ({
            value: item.uid,
            title: item.name,
          })) || []),
        ]);
      }
    )
  );

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
