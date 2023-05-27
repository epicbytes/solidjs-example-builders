import { FieldProps, Field } from "solid-form-handler";
import { Component, createEffect, createSignal, For, Show } from "solid-js";
import { tw } from "typewind";
import { Icon } from "solid-heroicons";
import { xMark } from "solid-heroicons/outline";

export type ButtonGroupControlProps = FieldProps & {
  label?: string;
  options?: Array<SelectableOption>;
  value?: string | number;
  triggers?: string[];
  withReset?: boolean;
  onResetClick?: any;
  isNumeric?: boolean;
};

export const ButtonGroupControl: Component<ButtonGroupControlProps> = (
  props
) => {
  const [withResetAvailable, setWithResetAvailable] =
    createSignal<boolean>(false);
  createEffect(() => {
    setWithResetAvailable(
      Boolean(props.withReset && props.options?.length > 0)
    );
  });
  return (
    <Field
      {...props}
      mode="radio-group"
      render={(field) => (
        <div>
          <Show when={props.label}>
            <label class={tw.label}>{props.label}</label>
          </Show>
          <div
            class={tw.btn_group}
            classList={{ "is-invalid": field.helpers.error }}
          >
            <For each={props.options}>
              {(option, i) => (
                <input
                  {...field.props}
                  onChange={(event) =>
                    props.isNumeric
                      ? field.props.onChange({
                          currentTarget: { value: Number(event.target.value) },
                        })
                      : field.props.onChange(event)
                  }
                  id={`${field.props.id}-${i()}`}
                  checked={field.helpers.isChecked(option.value)}
                  value={option.value}
                  class={tw.btn.btn_sm.text_sm.normal_case}
                  classList={{ "is-invalid": field.helpers.error }}
                  type="radio"
                  data-title={option.title}
                />
              )}
            </For>
            <Show when={withResetAvailable()}>
              <button
                class={tw.btn.btn_outline.btn_error.btn_sm}
                type={"button"}
                onclick={props.onResetClick && props.onResetClick}
              >
                <Icon path={xMark} class={tw.h_4.w_4} />
              </button>
            </Show>
          </div>
          <Show when={field.helpers.error}>
            <div class={tw.text_error}>{field.helpers.errorMessage}</div>
          </Show>
        </div>
      )}
    />
  );
};
