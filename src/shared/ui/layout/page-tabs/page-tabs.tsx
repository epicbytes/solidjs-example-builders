import { tw } from "typewind";
import { A, useLocation } from "@solidjs/router";
import { Icon } from "solid-heroicons";
import { arrowLeft } from "solid-heroicons/outline";
import { StringFromTemplate } from "@/shared/utils/extentions";
import { For, Show } from "solid-js";

export const PageTabs = (props) => {
  const location = useLocation();
  const params = props.pageParams;
  return (
    <div
      class={
        tw.tabs.mb_4.pt_4.top_0.sticky.bg_base_100$["30"].mb_4.z_[5]
          .backdrop_blur
      }
    >
      <For each={props.options}>
        {(option) => {
          const href = () => StringFromTemplate(option.href, params);
          return (
            <A
              class={tw.tab}
              href={href()}
              classList={{
                [tw.tab_active]: location.pathname === href(),
                [tw.tab_bordered]: !option.isBackLink,
              }}
            >
              <Show when={option.isBackLink}>
                <Icon path={arrowLeft} class={tw.w_4.h_4} />
              </Show>
              <span>{option.title}</span>
            </A>
          );
        }}
      </For>
    </div>
  );
};
