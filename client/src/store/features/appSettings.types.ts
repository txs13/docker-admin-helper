import { AppLanguageOptions } from "../../resources/getTextResources.types";

export interface User {}

export interface CookiesData {
  refreshToken?: string;
  expires?: number;
  userEmail?: string;
}

export interface AppSettings {
  currentUser?: User;
  cookiesData?: CookiesData;
  appLanguage?: AppLanguageOptions;
}
