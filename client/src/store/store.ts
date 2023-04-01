import { configureStore } from "@reduxjs/toolkit";
import usersRolesReducer from "./features/usersRoles.slice";
import appStateReducer from "./features/appState.slice";
import modalStateReducer from "./features/modalState.slice";

const store = configureStore({
  reducer: {
    usersRoles: usersRolesReducer,
    appState: appStateReducer,
    modalState: modalStateReducer
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
