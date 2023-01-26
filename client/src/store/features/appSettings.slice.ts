import { createSlice } from "@reduxjs/toolkit";

import { AppSettings } from "./appSettings.types";
import { AppLanguageOptions } from "../../resources/getTextResources.types";

export const initialValue: AppSettings = {};

export const cookiesDataSlice = createSlice({
  name: "cookiesSlice",
  initialState: { value: initialValue },
  reducers: {
    setCookies: (state, action) => {
      state.value = action.payload;
    },
    setAndStoreCookies: (state, action) => {
      localStorage.setItem("refreshinfo", action.payload);
      state.value = action.payload;
    },
    deleteCookies: (state, action) => {
      state.value = initialValue;
    },
    deleteRefreshToken: (state, action) => {
      state.value = {
        ...state.value,
      };
    },
  },
});

export const {
  setCookies,
  setAndStoreCookies,
  deleteCookies,
  deleteRefreshToken,
} = cookiesDataSlice.actions;

export default cookiesDataSlice.reducer;
