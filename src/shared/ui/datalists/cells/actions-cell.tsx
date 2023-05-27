import { Accessor, For, Show } from "solid-js";
import { tw } from "typewind";
import * as App from "@/fake-api";
import { Button } from "@/shared/ui/buttons/button/button";
import { ObjectFromTemplate } from "@/shared/utils/extentions";
import { emitter } from "@/events";
import * as outline from "solid-heroicons/outline";
import { Icon } from "solid-heroicons";

export type DefaultNameCellProps = {
  item?: any;
  actions?: any;
  index?: Accessor<number>;
  value?: any;
};

export function ActionsCell(props: DefaultNameCellProps) {
  const { item, actions, index } = props;
  return (
    <section class={tw.flex.gap_4.justify_end}>
      <For each={actions}>
        {(actionItem) => {
          return (
            <Button
              onClick={() => {
                switch (actionItem.type) {
                    case"DELETE_INLINE_ROW":
                    emitter.emit("DELETE_INLINE_ROW", {
                      name: actionItem.value,
                      index: index,
                    });
                    break;
                  case "REMOVE_RPC":
                    App[actionItem.method](
                      ObjectFromTemplate(actionItem.arguments, item)
                    ).then(() => {
                      actionItem.refetchMethod &&
                        emitter.emit("REFETCH_RESOURCE", {
                          appMethod: actionItem.refetchMethod,
                        });
                    });
                    break;
                  default:
                  //
                }
              }}
            >
              <Show when={outline[actionItem.icon]}>
                <Icon path={outline[actionItem.icon]} class={tw.h_5.w_5} />
              </Show>
              {item?.deleted_at ? <span>deleted</span> : actionItem?.title}
            </Button>
          );
        }}
      </For>
    </section>
  );
}
