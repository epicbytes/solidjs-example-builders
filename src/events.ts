import { createGlobalEmitter } from "@solid-primitives/event-bus";
import { Accessor } from "solid-js";
import { toast } from "solid-toast";

export type EmitterTypes = {
  DELETE_SERVICE_PLUGIN_ENTITY: { uid: string; service_uid?: string };
  REFETCH_RESOURCE: { appMethod: string };
  OPEN_ROW_FOR_EDIT: { name: string; index: number };
  SUBMIT_FORM: { name: string };
  ADD_INLINE_ROW: { name: string; props?: Record<string, any> };
  DELETE_INLINE_ROW: {
    name: string;
    index: Accessor<number>;
    props?: Record<string, any>;
  };
  CLOSE_MODAL: any;
  OPEN_MODAL: any;
  OPEN_PAGE: any;
};

const emitter = createGlobalEmitter<EmitterTypes>();

emitter.listen((event) => {
  toast(event.name, {
    duration: 2000,
    position: "bottom-center",
  });
  console.log("EVENT FIRED:", event.name);
  console.table(event.details);
});

export { emitter };
