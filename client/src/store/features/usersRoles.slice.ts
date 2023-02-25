import { createSlice } from "@reduxjs/toolkit";

import { usersRoles } from "./usersRoles.types";
import { AppLanguageOptions } from "../../resources/getTextResources.types";

export const initialValue: usersRoles = {};

export const usersRolesSlice = createSlice({
  name: "usersRolesSlice",
  initialState: { value: initialValue },
  reducers: {
    updateUsersRoles: (state, action) => {
      state.value = action.payload;
    },
    resetUsersRoles: (state, action) => {
      state.value = initialValue;
    },
  },
});

export const { updateUsersRoles, resetUsersRoles } =
  usersRolesSlice.actions;

export default usersRolesSlice.reducer;
