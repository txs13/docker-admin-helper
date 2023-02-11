import { makeStateLoaded } from "./appStateServices";
import { updatePublicRoles } from "./appSettingsServices"
import store from "../store";

const startApService = async () => {
  // fetch public roles
  console.log(store.getState().appSettings.value);
  await updatePublicRoles();
  console.log(store.getState().appSettings.value);
  // read cookies
  // TODO: read cookies
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
