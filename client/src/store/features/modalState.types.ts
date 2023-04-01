import { ReactElement } from "react";

export interface ModalState {
  mainModalOpen: boolean;
  formToRender?: ModalForms;
  formParams?: ModalFormParams;
  confirmationModalOpen: boolean;
  confirmationText?: string;
}

export interface ModalFormParams {
  id: string;
  [key: string]: any;
}

export enum ModalForms {
  "ROLE_FORM",
  "USER_FORM",
  "UNDEFINED"
}