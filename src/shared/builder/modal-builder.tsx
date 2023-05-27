import { usePageBuilder } from "@/shared/builder/page-builder-context";
import { For, splitProps } from "solid-js";
import { tw } from "typewind";
import { Dynamic } from "solid-js/web";
import { Library } from "@/shared/builder/library";

export function ModalBuilder(props) {
  const [{ widgets, initialData }] = splitProps(props, [
    "widgets",
    "initialData",
  ]);
  const ctx = usePageBuilder();
  return (
    <For each={widgets}>
      {(widget) => (
        <section class={tw.mb_4}>
          <Dynamic
            component={Library[widget.name]}
            {...widget.props}
            pageParams={ctx.params()}
            initialData={initialData}
          />
        </section>
      )}
    </For>
  );
}
