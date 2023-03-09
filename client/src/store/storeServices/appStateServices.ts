import store from "../store";
import {
  resetAppState,
  updateAppState,
} from "../features/appState.slice";
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
  let localCookiesData = { ...cookiesData };
  if (localCookiesData.accessToken) delete localCookiesData.accessToken;
  localStorage.setItem("appStateCookiesData", JSON.stringify(localCookiesData));
};

// read local storage and update store app state
export const readUpdateCookiesData = () => {
  let appState = store.getState().appState.value;
  const localCookiesData = localStorage.getItem("appStateCookiesData");
  if (localCookiesData) {
    try {
      const cookiesData = JSON.parse(localCookiesData);
      store.dispatch(updateAppState({ ...appState, cookiesData: cookiesData }));
    } catch (e) {
      localStorage.removeItem("appStateCookiesData");
    }
  }
};

// logout store reset
export const logoutStoreReset = () => {
  store.dispatch(resetAppState());
};

// logout cookies cleanup
export const logoutCookiesCleanup = () => {
  let appState = store.getState().appState.value;
  if (appState.cookiesData?.storedEmail) {
    const localCookiesData: CookiesData = {
      storedEmail: appState.cookiesData?.storedEmail,
    };
    localStorage.setItem(
      "appStateCookiesData",
      JSON.stringify(localCookiesData)
    );
  } else {
    localStorage.removeItem("appStateCookiesData");
  }
};
