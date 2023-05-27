import { For, JSX, Show } from "solid-js";
import { tw } from "typewind";
import { Button } from "@/shared/ui/buttons/button/button";
import { CaptionSettings } from "@/shared/ui/datalists/table/table";
import * as outline from "solid-heroicons/outline";
import { Icon } from "solid-heroicons";
import { emitter } from "@/events";
import { ObjectFromTemplate } from "@/shared/utils/extentions";
import { usePageBuilder } from "@/shared/builder/page-builder-context";

export function DrawCaption(props: CaptionSettings): JSX.Element {
  const ctx = usePageBuilder();

  return (
    <caption
      class={
        tw.flex.justify_between.bg_base_200.block.w_full.px_4.py_3.rounded_t_lg
          .font_bold
      }
    >
      <Show when={Boolean(props.title)}>
        <span>{props.title}</span>
        <Show when={props?.actions.length > 0}>
          <div class={tw.flex.gap_4.justify_end}>
            <For each={props.actions || []}>
              {(action) => (
                <Button
                  onClick={() => {
                    switch (action.type) {
                      case "OPEN_MODAL":
                        emitter.emit("OPEN_MODAL", {
                          modalName: action.value,
                          modalProps: {
                            actions: action.props.actions,
                            widgets: action.props.widgets,
                            initialData:
                              ObjectFromTemplate(
                                action.props.initialData || {},
                                ctx.params()
                              ) || {},
                          },
                        });
                        break;
                      default:
                        emitter.emit(action.type, {
                          name: action.value,
                          props: action.props || {},
                        });
                    }
                  }}
                >
                  <Show when={action.icon}>
                    <Icon path={outline[action.icon]} class={tw.h_5.w_5} />
                  </Show>
                  <Show when={Boolean(action.title)}>
                    <span>{action.title}</span>
                  </Show>
                </Button>
              )}
            </For>
          </div>
        </Show>
      </Show>
    </caption>
  );
}
