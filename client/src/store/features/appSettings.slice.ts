import { createSlice } from "@reduxjs/toolkit";

import { AppSettings } from "./appSettings.types";
import { AppLanguageOptions } from "../../resources/getTextResources.types";

export const initialValue: AppSettings = {};

export const appSettingsSlice = createSlice({
  name: "appSettingsSlice",
  initialState: { value: initialValue },
  reducers: {
    updateAppSettings: (state, action) => {
      state.value = action.payload;
    },
    resetAppSettings: (state, action) => {
      state.value = initialValue;
    },
  },
});

export const {
  updateAppSettings,
  resetAppSettings,
} = appSettingsSlice.actions;

export default appSettingsSlice.reducer;
