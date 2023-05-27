import { For, JSX } from "solid-js";
import { tw } from "typewind";

export function DrawHeader({ columns }): JSX.Element {
  return (
    <tr>
      <For each={columns}>
        {(column, index) => (
          <td
            class={tw.font_bold.rounded_t_none}
            classList={{ [tw.w_full]: index() === 0 }}
          >
            {column.title}
          </td>
        )}
      </For>
    </tr>
  );
}
