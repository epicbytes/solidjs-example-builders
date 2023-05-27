import {
  Accessor,
  Component,
  createEffect,
  createResource,
  createSignal,
  For,
  Match,
  on,
  onMount,
  Show,
  Switch,
} from "solid-js";
import { tw } from "typewind";
import * as AppMethod from "@/fake-api";
import { ObjectfromPath, ObjectFromTemplate } from "@/shared/utils/extentions";
import type { EmitterTypes } from "@/events";
import { DrawCaption } from "@/shared/ui/datalists/table/draw-caption";
import { DrawHeader } from "@/shared/ui/datalists/table/draw-header";
import { DrawRow } from "@/shared/ui/datalists/table/draw-row";
import { emitter } from "@/events";
import { DrawFooter } from "@/shared/ui/datalists/table/draw-footer";
import { DrawInlineRow } from "@/shared/ui/datalists/table/draw-inline-row";

export enum TableType {
  Regular,
  Inline,
}

export type TableProps<T> = {
  name?: string;
  formHandler?: any;
  type?: TableType;
  items?: any;
  itemsPath?: string;
  RowElement?: Component<{
    item: T;
    index?: Accessor<number>;
  }>;
  loading?: boolean;
  HeaderElement?: Component;
  caption?: CaptionSettings;
  columns: any;
  source?: {
    type: SourceType;
    value?: keyof typeof AppMethod;
    params?: Record<string, any>;
    appMethodArgs?: Record<string, any>;
    refetchEvent?: keyof EmitterTypes;
  };
  formData: any;
};

export enum ColumnType {
  Default = "Default",
  DefaultNameCell = "DefaultNameCell",
  BadgesCell = "BadgesCell",
  ActionsCell = "ActionsCell",
}

export enum SourceType {
  ApiMethod,
  DataArray,
}

export type CaptionSettingsAction = {
  title?: string;
  type: keyof EmitterTypes;
  value: string; //"ServiceModal",
  icon?: string;
  props: Record<string, any>;
};

export type CaptionSettings = {
  title?: string;
  actions: CaptionSettingsAction[];
  pageParams?: Record<string, any>;
};

export function Table<T>(props: TableProps<T>) {
  const type = props.type || TableType.Regular;
  const [itemsFromSource, { refetch }] = createResource(
    () => {
      switch (type) {
        case TableType.Regular:
          return AppMethod[props.source.value]?.(
            ObjectFromTemplate(
              props.source?.arguments || {},
              props?.pageParams || {}
            ) || {}
          );
        case TableType.Inline:
          return Promise.resolve({
            items: props.formData()[props.name],
          });
        default:
          return Promise.resolve({ item: [] });
      }
    },
    {
      initialValue: {
        items: [],
      },
    }
  );

  createEffect(
    on(
      () => props.formData?.(),
      () => {
        refetch();
      }
    )
  );

  const [items, setItems] = createSignal<any[]>(null);

  createEffect(
    on(
      () => itemsFromSource(),
      () => {
        setItems(ObjectfromPath(itemsFromSource() || {}, props.itemsPath));
      }
    )
  );

  onMount(() => {
    refetch();
    emitter.on("REFETCH_RESOURCE", ({ appMethod }) => {
      if (props.source.value === appMethod) {
        refetch();
      }
    });
  });

  return (
    <section>
      <Show when={Boolean(props.caption)}>
        <DrawCaption
          actions={props.caption.actions}
          title={props.caption.title}
          pageParams={
            ObjectFromTemplate(
              props.source?.arguments || {},
              props?.pageParams || {}
            ) || {}
          }
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
                  <Switch>
                    <Match when={type === TableType.Inline}>
                      <DrawInlineRow
                        name={props.name}
                        formHandler={props.formHandler}
                        columns={props.columns}
                        item={item}
                        index={index}
                        opened={false}
                        widgets={[]}
                      />
                    </Match>
                    <Match when={type === TableType.Regular}>
                      <DrawRow
                        columns={props.columns}
                        item={item}
                        index={index()}
                      />
                    </Match>
                  </Switch>
                </Match>
              </Switch>
            )}
          </For>
        </tbody>
      </table>
      <Show when={!items() || items()?.length === 0}>
        <div class={tw.m_4}>
          <div class={tw.alert.flex.justify_center}>No items for display</div>
        </div>
      </Show>
      <Show when={type === TableType.Inline}>
        <Show when={Boolean(props.caption)}>
          <DrawFooter actions={props.caption.actions} />
        </Show>
      </Show>
    </section>
  );
}
