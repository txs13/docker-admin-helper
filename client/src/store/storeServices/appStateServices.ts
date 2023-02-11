import store, { RootState } from "../store";
import { updateAppState } from "../features/appState.slice";

export const makeStateLoading = () => {
  let appState = store.getState().appState.value;
  appState = { ...appState, globalLoading: true };
  store.dispatch(updateAppState(appState));
};

export const makeStateLoaded = () => {
  let appState = store.getState().appState.value;
  appState = { ...appState, globalLoading: false };
  store.dispatch(updateAppState(appState));
};
