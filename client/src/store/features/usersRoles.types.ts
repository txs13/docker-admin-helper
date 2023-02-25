import { RoleDocument, UserDocument } from "./appState.types"

export interface usersRoles {
  appRoles?: RoleDocument[];
  appUsers?: UserDocument[];
}
