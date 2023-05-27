import { For, JSX, Match, Switch } from "solid-js";
import { tw } from "typewind";
import { Library } from "@/shared/builder/library";
import { Dynamic } from "solid-js/web";

export function DrawRow({ columns, item, index }): JSX.Element {
  return (
    <tr>
      <For each={columns}>
        {(column, index) => (
          <td
            class={tw.font_bold.rounded_t_none}
            classList={{ [tw.w_full]: index() === 0 }}
          >
            <Switch>
              <Match when={Boolean(Library[column.type])}>
                <Dynamic
                  component={Library[column.type]}
                  item={item}
                  {...column.props}
                />
              </Match>
              <Match when={!Library[column.type]}>{item.name}</Match>
            </Switch>
          </td>
        )}
      </For>
    </tr>
  );
}
