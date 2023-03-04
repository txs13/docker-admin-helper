import store, { RootState } from "../store";
import { updateAppState } from "../features/appState.slice";
import { CookiesData } from "../features/appState.types";

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

// update the store and save cookies data to cookies
export const updateSaveCookiesData = (cookiesData: CookiesData) => {
  let appState = store.getState().appState.value;
  appState = { ...appState, cookiesData: cookiesData };
  store.dispatch(updateAppState(appState));
  localStorage.setItem("appStateCookiesData", JSON.stringify(cookiesData));
};

// read local storage and update store app state
export const readUpdateCookiesData = () => {
  let appState = store.getState().appState.value;
  const localCookiesData = localStorage.getItem("appStateCookiesData");
  if (localCookiesData) {
    try {
      const cookiesData = JSON.parse(localCookiesData);
      if (cookiesData instanceof cookiesData) {
        store.dispatch(
          updateAppState({ ...appState, cookiesData: cookiesData })
        );
      }
    } catch (e) {
      localStorage.removeItem("appStateCookiesData");
    }
  }
};
