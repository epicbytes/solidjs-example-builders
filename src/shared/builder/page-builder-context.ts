import { createContextProvider } from "@solid-primitives/context";
import { createResource, createSignal } from "solid-js";
import * as AppMethod from "@/fake-api";

export const [PageBuilderProvider, usePageBuilder] = createContextProvider(
  (props: { pageParams?: any; routerData?: any }) => {
    const [routes] = createResource(() => AppMethod["ListRoute"](), {
      initialValue: [],
    });
    const [params, setParams] = createSignal(props.pageParams);
    const [routerData, setRouterData] = createSignal(props.routerData);
    return { params, setParams, routerData, setRouterData, routes };
  }
);
