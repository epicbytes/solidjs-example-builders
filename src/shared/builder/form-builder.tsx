import { tw } from "typewind";
import { Dynamic } from "solid-js/web";
import { Library } from "@/shared/builder/library";
import {
  createEffect,
  createResource,
  For,
  on,
  onMount,
  splitProps,
} from "solid-js";
import { useFormHandler } from "solid-form-handler";
import { yupSchema } from "solid-form-handler/yup";
import { toast } from "solid-toast";
import * as AppMethod from "@/fake-api";

import { emitter } from "@/events";
import { usePageBuilder } from "@/shared/builder/page-builder-context";
import { getValidationSchema } from "@/shared/utils/validation-schema";

function CellWidget({ widget, children }) {
  return (
    <section
      classList={{
        [tw.col_span_3]: widget.width === 0 || !widget.width,
        [tw.col_span_1]: widget.width === 1,
        [tw.col_span_2]: widget.width === 2,
      }}
    >
      {children}
    </section>
  );
}

function FormInline(props) {
  const [{ widgets }] = splitProps(props, ["widgets"]);
  return (
    <section class={tw.grid.grid_cols_3.gap_4.mb_4}>
      <For each={widgets}>
        {(widget) => (
          <CellWidget widget={widget}>
            <Dynamic
              component={Library[widget.name]}
              {...widget.props}
              name={`${props.name}.${widget.props.name}`}
              formHandler={props.formHandler}
            />
          </CellWidget>
        )}
      </For>
    </section>
  );
}

function FormRegular(props) {
  const [{ widgets, api, initialData }] = splitProps(props, [
    "widgets",
    "api",
    "initialData",
  ]);
  const ctx = usePageBuilder();
  const formHandler = useFormHandler(
    yupSchema(getValidationSchema(api.saveModel.validation))
  );
  const { fillForm, validateForm, formData, getFormErrors } = formHandler;
  const [data, { refetch }] = createResource(
    () => [ctx.params(), initialData],
    ([params, initial]) => {
      if (typeof api?.getModel === "string") {
        return api.getModel
          ? AppMethod[api.getModel]?.({ ...params, ...initial })
          : initial;
      }

      try {
        if (
          Array.isArray(api.getModel?.validation) &&
          api.getModel.validation.length > 0
        ) {
          getValidationSchema(api.getModel.validation).validateSync({
            ...params,
            ...initial,
          });
        }
        return AppMethod[api.getModel.name]?.({ ...params, ...initial });
      } catch (e) {
        console.log(e);
        return initial;
      }
    }
  );

  const notify = () => toast.success("Successfully save");
  const notifyError = (err: string) => toast.error(err);

  const submit = async (event: Event) => {
    event.preventDefault();
    try {
      await validateForm();
      typeof api?.saveModel === "string"
        ? await AppMethod[api.saveModel]({ item: formData() })
        : await AppMethod[api.saveModel.name]({ item: formData() });
      notify();
      refetch();
      emitter.emit("CLOSE_MODAL");
    } catch (error) {
      notifyError(error);
      console.error(error);
    }
  };

  createEffect(
    on(
      () => [api?.getModel?.initialData, ctx.params()],
      () => {
        fillForm({
          ...ctx.params(),
          ...(api?.getModel?.initialData || {}),
        });
      }
    )
  );
  createEffect(
    on(
      () => data(),
      () => {
        fillForm(data()?.item);
      }
    )
  );

  onMount(() => {
    emitter.on("SUBMIT_FORM", (payload) => {
      if (payload.name === props.name) {
        submit(new Event("submit"));
      }
    });
  });

  return (
    <form onSubmit={submit}>
      {JSON.stringify(formData())}
      {JSON.stringify(getFormErrors())}
      <section class={tw.grid.grid_cols_3.gap_4.mb_4}>
        <For each={widgets}>
          {(widget) => (
            <CellWidget widget={widget}>
              <Dynamic
                component={Library[widget.name]}
                {...widget.props}
                name={widget.props.name}
                formHandler={formHandler}
                formData={formData}
              />
            </CellWidget>
          )}
        </For>
      </section>
    </form>
  );
}

export function FormBuilder(props) {
  return props.inline ? FormInline(props) : FormRegular(props);
}
