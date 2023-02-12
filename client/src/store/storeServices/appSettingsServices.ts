import { updateAppSettings } from "../features/appSettings.slice";
import { LoginInput, RoleDocument } from "../features/appSettings.types";
import store from "../store";
import { loginApiCall } from "../../api/sessionApi";
import { fetchPublicRoles } from "../../api/roleApi";

export const loginService = async (loginInput: LoginInput) => {
  const loginResponse = await loginApiCall(loginInput);

  if (!loginResponse.error) {
    
  } else {

  }
};

export const updatePublicRoles = async () => {
  let appSettings = store.getState().appSettings.value;
  const rolesResponse = await fetchPublicRoles();
  if (!rolesResponse.error) {
    appSettings = {
      ...appSettings,
      appRoles: rolesResponse.data as RoleDocument[],
    };
    store.dispatch(updateAppSettings(appSettings));
  } else {
    //TODO: process error handling and forwarding to the error page
  }
};
