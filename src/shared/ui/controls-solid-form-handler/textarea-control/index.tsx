import { FieldProps, Field } from "solid-form-handler";
import { Component, JSX, Show, splitProps } from "solid-js";
import { tw } from "typewind";

export type TextAreaControlProps =
  JSX.InputHTMLAttributes<HTMLTextAreaElement> &
    FieldProps & { label?: string };

export const TextAreaControl: Component<TextAreaControlProps> = (props) => {
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
        <div class={tw.mb_4} classList={local.classList}>
          <Show when={local.label}>
            <label class={tw.label} for={field.props.id}>
              {local.label}
            </label>
          </Show>
          <textarea
            {...rest}
            spellcheck={false}
            {...field.props}
            class={tw.textarea.textarea_bordered.textarea_sm.w_full}
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
