import { tw } from "typewind";
import { For, Show } from "solid-js";
import { Button } from "@/shared/ui/buttons/button/button";
import { emitter } from "@/events";
import * as outline from "solid-heroicons/outline";
import { Icon } from "solid-heroicons";

export const FormActions = ({ actions }) => {
  return (
    <section class={tw.flex.gap_4.justify_end}>
      <For each={actions}>
        {(actionItem) => {
          return (
            <Button
              onClick={() => {
                switch (actionItem.type) {
                  case "SUBMIT_FORM":
                    emitter.emit("SUBMIT_FORM", actionItem.props);
                    break;
                  default:
                  //
                }
              }}
            >
              <Show when={outline[actionItem.icon]}>
                <Icon path={outline[actionItem.icon]} class={tw.h_5.w_5} />
              </Show>
              {actionItem.title}
            </Button>
          );
        }}
      </For>
    </section>
  );
};
