export interface ModalState {
  mainModalOpen: boolean;
  formToRender?: ModalForms;
  formProps?: ModalFormProps;
  confirmationModalOpen: boolean;
  confirmationText?: string;
  confirmationAction?: ConfirmationModalActions;
}

export interface ModalFormProps {
  id: string;
  [key: string]: any;
}

export enum ModalForms {
  "ROLE_FORM",
  "USER_FORM",
  "UNDEFINED",
}

export enum ConfirmationModalActions {
  "DELETE_USER",
  "UPDATE_USER",
  "DELETE_ROLE",
  "UPDATE_ROLE",
  "UNDEFINED"
}