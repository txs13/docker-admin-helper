import { updateUsersRoles } from "../features/usersRoles.slice";
import { RoleDocument, RoleInput, UserDocument } from "../features/appState.types";
import store from "../store";
import {
  apiCallHelper,
  ROLE_API,
  USER_API,
} from "../../api/apiSettingsAndMethods";

export const updatePublicRoles = async () => {
  let usersRoles = store.getState().usersRoles.value;
  const rolesResponse = await apiCallHelper({
    method: "GET",
    url: `${ROLE_API}`,
    auth: false,
  });
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
  const rolesResponse = await apiCallHelper({
    method: "GET",
    url: `${ROLE_API}/allroles`,
    auth: true,
  });
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

export const createRoleService = async (roleInput: RoleInput) => {
  const response = await apiCallHelper({
    method: "POST",
    url: `${ROLE_API}`,
    auth: true,
    objectToSend: roleInput,
  });

  if (!response.error) {
    await updateAllRoles();
  } else {
    //TODO: process error handling and forwarding to the error page
  }
  
  return response;
};

export const deleteRoleService = async (roleId: string) => {
  const response = await apiCallHelper({
    method: "DELETE",
    url: `${ROLE_API}/${roleId}`,
    auth: true,
  });

  if (!response.error) {
    await updateAllRoles();
  } else {
    //TODO: process error handling and forwarding to the error page
  }
};

export const resolveRoleById = (roleId: string): RoleDocument | undefined => {
  const usersRoles = store.getState().usersRoles.value;
  return usersRoles.appRoles?.find((it) => it._id === roleId);
};

export const updateAllUsers = async () => {
  let usersRoles = store.getState().usersRoles.value;
  const usersResponse = await apiCallHelper({
    method: "GET",
    url: `${USER_API}/allusers`,
    auth: true,
  });
  if (!usersResponse.error) {
    usersRoles = {
      ...usersRoles,
      appUsers: usersResponse.data as UserDocument[],
    };
    store.dispatch(updateUsersRoles(usersRoles));
  } else {
    //TODO: process error handling and forwarding to the error page
  }
};

export const resolveUserById = (userId: string): UserDocument | undefined => {
  const usersRoles = store.getState().usersRoles.value;
  return usersRoles.appUsers?.find((it) => it._id === userId);
};