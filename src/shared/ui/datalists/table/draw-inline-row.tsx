import { createSignal, For, JSX, Match, onMount, Switch } from "solid-js";
import { tw } from "typewind";
import { Library } from "@/shared/builder/library";
import { Dynamic } from "solid-js/web";
import { emitter } from "@/events";
import { FormBuilder } from "@/shared/builder/form-builder";
import { Button } from "@/shared/ui/buttons/button/button";

export function DrawInlineRow({
  name,
  formHandler,
  columns,
  item,
  index,
  opened,
  widgets,
}): JSX.Element {
  const [isOpened, setIsOpened] = createSignal<boolean>(
    Boolean(opened) || !Boolean(item.name)
  );
  onMount(() => {
    emitter.on("OPEN_ROW_FOR_EDIT", (eventPayload) => {
      if (eventPayload.name === name && eventPayload.index === index()) {
        setIsOpened(true);
      }
    });
  });
  return (
    <tr>
      <Switch>
        <Match when={isOpened()}>
          <td colspan={columns.length}>
            <FormBuilder
              inline
              formHandler={formHandler}
              name={`${name}.${index()}`}
              widgets={widgets}
            />
            <Button
              intent={"yellow"}
              onClick={() => {
                setIsOpened(false);
              }}
            >
              Apply
            </Button>
          </td>
        </Match>
        <Match when={!isOpened()}>
          <For each={columns}>
            {(column, columnIndex) => (
              <td
                class={tw.font_bold.rounded_t_none}
                classList={{ [tw.w_full]: columnIndex() === 0 }}
              >
                <Switch>
                  <Match when={Boolean(Library[column.type])}>
                    <Dynamic
                      component={Library[column.type]}
                      name={name}
                      index={index}
                      item={item}
                      {...column.props}
                    />
                  </Match>
                  <Match when={!Library[column.type]}>{item.name}</Match>
                </Switch>
              </td>
            )}
          </For>
        </Match>
      </Switch>
    </tr>
  );
}
