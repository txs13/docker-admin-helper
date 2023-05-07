export interface ModalState {
  mainModalOpen: boolean;
  formToRender?: ModalForms;
  formProps?: ModalFormProps;
  confirmationModalOpen: boolean;
  confirmationText?: string;
  actionIsConfirmed?: boolean;
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