import { For } from "solid-js";
import { tw } from "typewind";
import { ObjectfromPath } from "@/shared/utils/extentions";

export type DefaultNameCellProps = {
  item?: any;
  path?: any;
};

export function BadgesCell({ item, path }: DefaultNameCellProps) {
  return (
    <For each={ObjectfromPath(item, path) || []}>
      {(variant, index) => <span class={tw.badge.mx_2}>{variant}</span>}
    </For>
  );
}
