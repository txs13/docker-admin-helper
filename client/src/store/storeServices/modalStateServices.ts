import store from "../store";
import {
  resetModalState,
  updateModalState,
} from "../features/modalState.slice";
import { ModalFormParams, ModalForms } from "../features/modalState.types";

export const handleModalOpen = (formToRender: ModalForms, props?: ModalFormParams) => {
  const modalState = store.getState().modalState.value;
  store.dispatch(
    updateModalState({
      ...modalState,
      formToRender: formToRender,
      props: props,
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
