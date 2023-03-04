import { updateUsersRoles } from "../features/usersRoles.slice";
import { LoginInput, RoleDocument } from "../features/appState.types";
import store from "../store";
import { loginApiCall } from "../../api/sessionApi";
import { fetchAllRolesApiCall, fetchPublicRolesApiCall } from "../../api/roleApi";

export const loginService = async (loginInput: LoginInput) => {
  const loginResponse = await loginApiCall(loginInput);

  if (!loginResponse.error) {
  } else {
  }
};

export const updatePublicRoles = async () => {
  let usersRoles = store.getState().usersRoles.value;
  const rolesResponse = await fetchPublicRolesApiCall();
  if (!rolesResponse.error) {
    usersRoles = {
      ...usersRoles,
      appRoles: rolesResponse.data as RoleDocument[],
    };
    store.dispatch(updateUsersRoles(usersRoles));
  } else {
    //TODO: process error handling and forwarding to the error page
  }
};

export const updateAllRoles = async () => {
  let usersRoles = store.getState().usersRoles.value;
  let appState = store.getState().appState.value;
  const rolesResponse = await fetchAllRolesApiCall(appState.cookiesData?.accessToken || "wrong token to reset the app");
  console.log(rolesResponse);
  if (!rolesResponse.error) {
    usersRoles = {
      ...usersRoles,
      appRoles: rolesResponse.data as RoleDocument[],
    };
    store.dispatch(updateUsersRoles(usersRoles));
  } else {
    //TODO: process error handling and forwarding to the error page
  }
};