import store, { RootState } from "../store";
import { updateAppState } from "../features/appState.slice";
import {
  refreshTokenApiCall,
  apiCallHelper,
  USER_API,
} from "../../api/apiSettingsAndMethods";
import {
  AppState,
  CookiesData,
  LoginInput,
  RoleDocument,
  UserDocument,
} from "../features/appState.types";
import {
  logoutCookiesCleanup,
  logoutStoreReset,
  makeStateLoaded,
  readUpdateCookiesData,
  updateSaveCookiesData,
} from "./appStateServices";
import { updateAllRoles, updatePublicRoles } from "./usersRolesServices";

interface LoginServiceResponse {
  error: boolean;
  errorMessage?: string;
}

const getRole = (userrole_id: string): RoleDocument | undefined => {
  const roles = store.getState().usersRoles.value.appRoles;
  return roles?.find((role) => role._id === userrole_id);
};

const generateGlobalErrorAndResetApp = async () => {
  // TODO: generate error
  
  // cleanup cookies
  logoutCookiesCleanup();

  // reset roles and fetch only public roles
  // TODO: clear all the features (users, hosts, etc.) after its implementation
  await updatePublicRoles();

  // reset appState store
  logoutStoreReset();
};

export const loginService = async (
  loginInput: LoginInput,
  storeEmail: boolean
): Promise<LoginServiceResponse> => {
  const loginResponse = await apiCallHelper({
    method: "POST",
    url: `${USER_API}/login`,
    auth: false,
    objectToSend: loginInput,
  });
  if (loginResponse.error) {
    return { error: true, errorMessage: loginResponse.data.message };
  } else {
    // dispatch cookies data
    const cookiesData: CookiesData = {
      accessToken: loginResponse.data.accessToken,
      refreshToken: loginResponse.data.refreshToken,
      sessionTtl: loginResponse.data.sessionTtl,
    };
    if (storeEmail) {
      cookiesData.storedEmail = loginInput.email;
    }
    updateSaveCookiesData(cookiesData);

    // dispatch user
    let storeAppState = store.getState().appState.value;
    const user: UserDocument = loginResponse.data.user;
    storeAppState = { ...storeAppState, currentUser: user };

    // if user is admin
    if (loginResponse.data.isAdmin) {
      // update store app state
      storeAppState = { ...storeAppState, isAdmin: true };
      // read all the app roles including admin ones
      await updateAllRoles();
    }

    // get current role
    const currentRole = getRole(user.userrole_id);
    if (currentRole) {
      storeAppState = { ...storeAppState, currentRole: currentRole };
      store.dispatch(updateAppState(storeAppState));
    } else {
      // TODO: reset the app
    }
    return { error: false };
  }
};

export const logoutService = async () => {
  // close the session if possible
  await apiCallHelper({
    method: "POST",
    url: `${USER_API}/logout`,
    auth: true
  });

  // cleanup cookies
  logoutCookiesCleanup();

  // reset roles and fetch only public roles
  // TODO: clear all the features (users, hosts, etc.) after its implementation
  await updatePublicRoles();

  // reset appState store
  logoutStoreReset();

};

export const refreshTokenService = async () => {
  let appState = store.getState().appState.value;
  if (appState.cookiesData?.refreshToken) {
    const refreshResponse = await refreshTokenApiCall(
      appState.cookiesData?.refreshToken
    );
    if (!refreshResponse.error) {
      const cookiesData: CookiesData = {
        ...appState.cookiesData,
        accessToken: refreshResponse.data.accessToken,
      };
      store.dispatch(updateAppState({ ...appState, cookiesData: cookiesData }));
      if (refreshResponse.data.isAdmin) {
        appState = { ...appState, isAdmin: true };
        await updateAllRoles();
      }
      const currentUser: UserDocument = refreshResponse.data.user;
      const currentRole = getRole(currentUser.userrole_id);
      if (currentRole) {
        appState = {
          ...appState,
          cookiesData: cookiesData,
          currentUser: currentUser,
          currentRole: currentRole
        };
        store.dispatch(updateAppState(appState));
      } else {
        await generateGlobalErrorAndResetApp();
      }
    } else {
      await generateGlobalErrorAndResetApp();
    }
  } else {
    await generateGlobalErrorAndResetApp();
  }
};

export const startApService = async () => {
  // fetch public roles
  await updatePublicRoles();

  // read cookies
  readUpdateCookiesData();

  // if cookies are there, refresh token and silent login
  let appState = store.getState().appState.value;
  if (appState.cookiesData?.refreshToken) {
    await refreshTokenService();
  }
  appState = store.getState().appState.value;
  // set startup procedures are done
  makeStateLoaded();
};