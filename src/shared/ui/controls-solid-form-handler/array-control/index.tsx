import { Field } from "solid-form-handler";
import { For, Match, onMount, Show, Switch } from "solid-js";
import { DrawCaption } from "@/shared/ui/datalists/table/draw-caption";
import { tw } from "typewind";
import { DrawHeader } from "@/shared/ui/datalists/table/draw-header";
import { DrawInlineRow } from "@/shared/ui/datalists/table/draw-inline-row";
import { DrawFooter } from "@/shared/ui/datalists/table/draw-footer";
import { emitter } from "@/events";

export const ArrayControl = (props) => {
  return (
    <Field
      name={props.name}
      formHandler={props.formHandler}
      mode="input"
      render={(field) => {
        const items = () => field.props.value || [];
        onMount(() => {
          emitter.on("ADD_INLINE_ROW", (payload) => {
            if (payload.name === props.name) {
              props.formHandler.setFieldValue(payload.name, [
                ...(field.props.value || []),
                payload.props,
              ]);
            }
          });
          emitter.on("DELETE_INLINE_ROW", (payload) => {
            if (payload.name === props.name) {
              props.formHandler.setFieldValue(
                payload.name,
                props.formHandler
                  .getFieldValue(payload.name)
                  .filter((_, ind) => ind !== payload.index())
              );
            }
          });
        });
        return (
          <section>
            <Show when={Boolean(props.caption)}>
              <DrawCaption
                actions={props.caption.actions}
                title={props.caption.title}
              />
            </Show>
            <table class={tw.table.w_full.table_zebra.table_compact}>
              <thead>
                <Switch>
                  <Match when={props.HeaderElement != null}>
                    <props.HeaderElement />
                  </Match>
                  <Match when={props.columns?.length > 0}>
                    <DrawHeader columns={props.columns} />
                  </Match>
                </Switch>
              </thead>
              <tbody>
                <For each={items()}>
                  {(item, index) => (
                    <Switch>
                      <Match when={props.RowElement != null}>
                        <props.RowElement item={item} index={index} />
                      </Match>
                      <Match when={props.columns?.length > 0}>
                        <DrawInlineRow
                          name={props.name}
                          formHandler={props.formHandler}
                          columns={props.columns}
                          widgets={props.widgets}
                          item={item}
                          index={index}
                          opened={false}
                        />
                      </Match>
                    </Switch>
                  )}
                </For>
              </tbody>
            </table>
            <Show when={!items() || items()?.length === 0}>
              <div class={tw.m_4}>
                <div class={tw.alert.flex.justify_center}>
                  No items for display
                </div>
              </div>
            </Show>
            <Show when={Boolean(props.caption)}>
              <DrawFooter actions={props.caption.actions} />
            </Show>
          </section>
        );
      }}
    />
  );
};
