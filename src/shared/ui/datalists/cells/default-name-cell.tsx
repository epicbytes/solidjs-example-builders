import { Accessor, Show } from "solid-js";
import { Icon } from "solid-heroicons";
import * as outline from "solid-heroicons/outline";
import { tw } from "typewind";
import { useNavigate } from "@solidjs/router";
import {
  ObjectFromTemplate,
  StringFromTemplate,
} from "@/shared/utils/extentions";
import { emitter } from "@/events";

export type DefaultNameCellProps = {
  name?: string;
  index?: Accessor<number>;
  title: string;
  subTitle?: string;
  onClick?: (event: MouseEvent) => void;
  isInlineLink?: boolean;
  icon?: keyof typeof outline;
  striked?: boolean;
  item?: any;
  action?: any;
  pageParams?: Record<string, any>;
};

export function DefaultNameCell({
  name,
  index,
  title,
  onClick,
  subTitle,
  icon,
  striked,
  item,
  action,
  pageParams,
}: DefaultNameCellProps) {
  const navigate = useNavigate();
  return (
    <button
      class={tw.flex.flex_col.raw("group")}
      onClick={(event) => {
        event.preventDefault();
        switch (action.type) {
          case "OPEN_PAGE":
            navigate(StringFromTemplate(action.value, item));
            break;
          case "OPEN_MODAL":
            emitter.emit("OPEN_MODAL", {
              modalName: action.value,
              modalProps: {
                ...action.props,
                initialData: ObjectFromTemplate(
                  action.props?.initialData || {},
                  item
                ),
                pageParams,
              },
            });
            break;
          case "OPEN_ROW_FOR_EDIT":
            emitter.emit("OPEN_ROW_FOR_EDIT", { name, index: index() });
            break;
          default:
            onClick && onClick(event);
        }
      }}
    >
      <span
        class={
          tw.group_hover(tw.underline.underline_offset_1).flex.items_center
            .space_x_2
        }
        classList={{
          [tw.text_base_content$["20"]]: item?.deleted_at > 0 || striked,
        }}
      >
        <Show when={icon} keyed>
          <Icon path={outline[icon]} class={tw.h_4.w_4} />
        </Show>
        <span>{StringFromTemplate(title, item)}</span>
      </span>
      <Show when={subTitle}>
        <small
          class={tw.text_clip.text_xs.block.max_w_2xl}
          classList={{
            [tw.text_base_content$["20"]]: item?.deleted_at > 0 || striked,
          }}
        >
          {StringFromTemplate(subTitle, item)}
        </small>
      </Show>
    </button>
  );
}
