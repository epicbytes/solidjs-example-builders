import { ModalContainer } from "@/shared/ui/modals/modals";
import {
  lazy,
  ValidComponent,
  createResource,
  Index,
  createSignal,
  createEffect,
  Show,
} from "solid-js";
import { tw } from "typewind";
import { Toaster } from "solid-toast";
import { Route, Routes } from "@solidjs/router";
import { SideMenu } from "@/shared/ui/layout/side-menu/side-menu";
import * as AppMethod from "@/fake-api";
import PageBuilder from "@/shared/builder/page-builder";
import { usePageBuilder } from "@/shared/builder/page-builder-context";

const modals: Record<string, ValidComponent> = {
  ModalBuilder: lazy(() =>
    import("@/shared/builder/modal-builder").then((res) => ({
      default: res.ModalBuilder,
    }))
  ),
};

export function App() {
  const ctx = usePageBuilder();
  const [routes, setRoutes] = createSignal([]);
  createEffect(() => {
    setRoutes(ctx.routes());
  });
  return (
    <section class={tw.grid.grid_cols_["100px_1fr"]}>
      <SideMenu />
      <main class={tw.px_4.pb_4.overflow_y_scroll.h_screen}>
        <Show when={ctx.routes.state === "ready"}>
          <Routes>
            <Index each={routes()}>
              {(route) => {
                return (
                  <Route
                    path={route().path}
                    component={PageBuilder}
                    data={() => {
                      const [data] = createResource(() =>
                        AppMethod["LoadPage"]({ page: route().page })
                      );
                      return data;
                    }}
                  />
                );
              }}
            </Index>
            <Route path={"*"} component={() => "<p>not found</p>"} />
          </Routes>
        </Show>
      </main>
      <ModalContainer modals={modals} />
      <Toaster />
    </section>
  );
}
