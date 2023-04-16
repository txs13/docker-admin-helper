import store from "../store";
import {
  resetModalState,
  updateModalState,
} from "../features/modalState.slice";
import { ConfirmationModalActions, ModalFormProps, ModalForms } from "../features/modalState.types";

export const handleModalOpen = (
  formToRender: ModalForms,
  formProps?: ModalFormProps
) => {
  const modalState = store.getState().modalState.value;
  store.dispatch(
    updateModalState({
      ...modalState,
      formToRender: formToRender,
      formProps: formProps,
      mainModalOpen: true,
    })
  );
};

export const handleModalClose = () => {
  const modalState = store.getState().modalState.value;
  store.dispatch(
    updateModalState({
      ...modalState,
      mainModalOpen: false,
    })
  );
};

export const handleConfirmationOpen = (
  confirmationText: string,
  confirmationAction: ConfirmationModalActions
) => {
  const modalState = store.getState().modalState.value;
  store.dispatch(
    updateModalState({
      ...modalState,
      confirmationModalOpen: true,
      confirmationText: confirmationText,
      confirmationAction: confirmationAction
    })
  );
};


export const handleConfirmationClose = () => {
  const modalState = store.getState().modalState.value;
  store.dispatch(
    updateModalState({
      ...modalState,
      confirmationModalOpen: false,
      confirmationText: undefined,
      confirmationAction: undefined,
    })
  );
};
