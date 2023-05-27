import { For, JSX, Show } from "solid-js";
import { tw } from "typewind";
import { Button } from "@/shared/ui/buttons/button/button";
import { CaptionSettings } from "@/shared/ui/datalists/table/table";
import { emitter } from "@/events";
import * as outline from "solid-heroicons/outline";
import { Icon } from "solid-heroicons";

export function DrawFooter(captionSettings: CaptionSettings): JSX.Element {
  return (
    <footer
      class={
        tw.flex.justify_end.bg_base_200.block.w_full.px_4.py_3.rounded_b_lg
          .font_bold
      }
    >
      <Show when={captionSettings?.actions.length > 0}>
        <div class={tw.flex.gap_4.justify_end}>
          <For each={captionSettings.actions || []}>
            {(action) => (
              <Button
                onClick={() => {
                  emitter.emit(action.type, {
                    name: action.value,
                    props: action.props,
                  });
                }}
              >
                <Show when={outline[action.icon]}>
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
    </footer>
  );
}
