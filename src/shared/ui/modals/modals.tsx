import { Dynamic, Suspense } from "solid-js/web";
import { For, Show, splitProps, ValidComponent } from "solid-js";
import { modal } from "@/shared/ui/modals/modals-store";
import { Icon } from "solid-heroicons";
import { tw } from "typewind";
import { Button } from "@/shared/ui/buttons/button/button";
import { emitter } from "@/events";
import * as outline from "solid-heroicons/outline";

export type ModalContainer = {
  modals: Record<string, ValidComponent>;
};

export const ModalContainer = (props: ModalContainer) => {
  const [{ modals }] = splitProps(props, ["modals"]);
  return (
    <div>
      <input
        type="checkbox"
        checked={Boolean(modal().modalName)}
        class={tw.modal_toggle}
      />
      <div class={tw.modal}>
        <div class={tw.modal_box.w_["11/12"].max_w_5xl.relative.p_0}>
          <header class={tw.flex.justify_end.sticky.top_0.p_4.z_10}>
            <button
              type={"button"}
              onClick={() => {
                emitter.emit("CLOSE_MODAL");
              }}
              class={tw.btn.btn_sm}
            >
              <Icon path={outline["xMark"]} class={tw.w_5.h_5} />
            </button>
          </header>
          <Suspense>
            <Show when={modals[modal().modalName]}>
              <div class={tw.overflow_y_scroll.max_h_full.px_4}>
                <Dynamic
                  component={modals[modal().modalName]}
                  {...modal().modalProps}
                />
              </div>
            </Show>
          </Suspense>
          <Show when={modal().modalProps?.actions}>
            <div
              class={
                tw.modal_action.sticky.bottom_0.bg_base_100$["30"].p_4.z_10
                  .backdrop_blur
              }
            >
              <For each={modal().modalProps?.actions || []}>
                {(action) => (
                  <Button
                    onClick={(event) => {
                      event.preventDefault();
                      emitter.emit(action.type, { ...(action.props || {}) });
                    }}
                  >
                    <Show when={action.icon && outline[action.icon]}>
                      <Icon path={outline[action.icon]} class={tw.h_5.w_5} />
                    </Show>
                    <span>{action.title}</span>
                  </Button>
                )}
              </For>
            </div>
          </Show>
        </div>
      </div>
    </div>
  );
};
