import { createSlice } from "@reduxjs/toolkit";
import { AppLanguageOptions } from "../../resources/getTextResources.types";

import { AppState } from "./appState.types";

export const initialValue: AppState = {
    globalLoading: true,
    appLanguage: AppLanguageOptions.EN
};

export const appStateSlice = createSlice({
  name: "appStateSlice",
  initialState: { value: initialValue },
  reducers: {
    updateAppState: (state, action) => {
      state.value = action.payload;
    },
    resetAppState: (state, action) => {
      state.value = initialValue;
    },
  },
});

export const { updateAppState, resetAppState } = appStateSlice.actions;

export default appStateSlice.reducer;
