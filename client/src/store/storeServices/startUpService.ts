import { makeStateLoaded } from "./appStateServices";
import { updatePublicRoles } from "./usersRolesServices";
import { CookiesData } from "../features/appState.types";
import store from "../store";

const startApService = async () => {
  // fetch public roles
  await updatePublicRoles();

  // read cookies
  const storageRefreshToken = localStorage.getItem("refreshinfo");
  if (storageRefreshToken) {
    const refreshToken: CookiesData = JSON.parse(storageRefreshToken);
    // TODO: read cookies
  }
  // silent login with cookies data
  // TODO: silent login
  // if admin has logged in, fetch all the roles
  // TODO: fetch all the roles
  // update app settings store using fetched data
  // TODO: update redux settings store
  // update app settings store using fetched data
  // TODO: update redux settings store
  makeStateLoaded();
};

export default startApService;
