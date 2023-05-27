import { useParams, useRouteData } from "@solidjs/router";
import { usePageBuilder } from "@/shared/builder/page-builder-context";
import {Accessor, createEffect, For, on} from "solid-js";
import { Dynamic } from "solid-js/web";
import { Library } from "@/shared/builder/library";
import { tw } from "typewind";

export default function PageBuilder() {
  const routerData:Accessor<any> = useRouteData();
  const pageParams = useParams();
  const { setParams, setRouterData } = usePageBuilder();
  createEffect(
    on(
      () => [routerData],
      () => {
        setRouterData(routerData);
      }
    )
  );
  createEffect(
    on(
      () => [pageParams],
      () => {
        setParams(pageParams);
      }
    )
  );
  const ctx = usePageBuilder();
  return (
    <section class={tw.py_4}>
      <For each={routerData()?.widgets}>
        {(widget) => (
          <Dynamic
            component={Library[widget.name]}
            {...widget.props}
            pageParams={ctx.params()}
          />
        )}
      </For>
    </section>
  );
}
