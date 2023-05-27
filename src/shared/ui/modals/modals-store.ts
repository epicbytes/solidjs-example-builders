import { createSignal } from "solid-js";
import * as outline from "solid-heroicons/outline";
import { emitter, EmitterTypes } from "@/events";
export type ModalAction = {
  title: string;
  type: keyof EmitterTypes;
  icon?: keyof typeof outline;
  props?: Record<string, any>;
};

export type ModalProps = {
  actions?: ModalAction[];
  [key: string]: unknown;
};
export type ModalData = {
  modalName: string;
  modalProps?: ModalProps;
};

const defaultModalState = {
  modalName: "",
  modalProps: {},
};

export const [modal, setModal] = createSignal<ModalData>(defaultModalState);

emitter.on("CLOSE_MODAL", () => {
  setModal(defaultModalState);
});

emitter.on("OPEN_MODAL", (payload) => {
  setModal(payload);
});