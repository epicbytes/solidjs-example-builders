import { A, useLocation } from "@solidjs/router";
import { tw } from "typewind";
import { Icon } from "solid-heroicons";
import * as outline from "solid-heroicons/outline";
import { Show } from "solid-js";

export type SideMenuItem = {
  title: string;
  path: string;
  icon: string;
  itemClass?: string;
  base?: boolean;
};

export const SideMenuItemElement = (data: SideMenuItem) => {
  const location = useLocation();
  return (
    <li
      class={tw.w_full.my_4}
      classList={{
        [tw.text_blue_600.bg_base_200]: data.base
          ? location.pathname === data.path
          : location.pathname.startsWith(data.path),
        [data.itemClass]: Boolean(data.itemClass),
      }}
    >
      <A
        href={data.path}
        class={tw.py_2.px_4.flex.flex_col.items_center.w_full.block}
      >
        <Show when={data.icon} keyed>
          <Icon path={outline[data.icon]} class={tw.h_10.w_10} />
        </Show>
        <span class={tw.block.text_xs}>{data.title}</span>
      </A>
    </li>
  );
};
