import { tw } from "typewind";
import { createEffect, createSignal, For } from "solid-js";
import { SideMenuItemElement } from "@/shared/ui/layout/side-menu-item-element/side-menu-item-element";
import { usePageBuilder } from "@/shared/builder/page-builder-context";

export const SideMenu = () => {
  const ctx = usePageBuilder();
  const [routes, setRoutes] = createSignal([]);
  createEffect(() => {
    setRoutes(ctx.routes());
  });
  return (
    <aside class={tw.flex.flex_col.justify_start.h_screen.overflow_y_scroll}>
      <ul class={tw.h_full.flex.flex_col.h_full}>
        <For each={routes()}>{(item) => <SideMenuItemElement {...item} />}</For>
      </ul>
    </aside>
  );
};
