import store from "../store";
import {
  resetModalState,
  updateModalState,
} from "../features/modalState.slice";
import { ModalFormProps, ModalForms } from "../features/modalState.types";

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

export const handleConfirmationOpen = () => {};

export const handleConfirmationClosed = () => {};
