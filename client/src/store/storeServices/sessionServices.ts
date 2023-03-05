import store, { RootState } from "../store";
import { updateAppState } from "../features/appState.slice";
import { loginApiCall } from "../../api/sessionApi";
import {
  CookiesData,
  LoginInput,
  UserDocument,
} from "../features/appState.types";
import { updateSaveCookiesData } from "./appStateServices";
import { updateAllRoles } from "./usersRolesServices";

interface LoginServiceResponse {
  error: boolean;
  errorMessage?: string;
}

export const loginService = async (
  loginInput: LoginInput,
  storeEmail: boolean
): Promise<LoginServiceResponse> => {
  const loginResponse = await loginApiCall(loginInput);
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
    const roles = store.getState().usersRoles.value.appRoles;
    const currentRole = roles?.find((role) => role._id === user.userrole_id);
    storeAppState = { ...storeAppState, currentRole: currentRole };

    store.dispatch(updateAppState(storeAppState));
    return { error: false };
  }
};

export const logoutService = async () => {};

export const refreshTokenService = async () => {
  const appState = store.getState().appState.value;
};
