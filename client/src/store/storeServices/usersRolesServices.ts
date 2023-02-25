import { updateUsersRoles } from "../features/usersRoles.slice";
import { LoginInput, RoleDocument } from "../features/appState.types";
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
  let usersRoles = store.getState().usersRoles.value;
  const rolesResponse = await fetchPublicRoles();
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
