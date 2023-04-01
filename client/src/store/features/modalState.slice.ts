import { createSlice } from "@reduxjs/toolkit";

import { ModalState } from "./modalState.types";

export const initialValue: ModalState = {
    confirmationModalOpen: false,
    mainModalOpen: false
};

export const modalStateSlice = createSlice({
  name: "modalStateSlice",
  initialState: { value: initialValue },
  reducers: {
    updateModalState: (state, action) => {
      state.value = action.payload;
    },
    resetModalState: (state) => {
      state.value = initialValue;
    },
  },
});

export const { updateModalState, resetModalState } = modalStateSlice.actions;

export default modalStateSlice.reducer;
