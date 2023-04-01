export enum AppLanguageOptions {
  "EN",
  "DE",
  "UA",
  "RU",
}

export enum FormsNames {
  "APP_GENERAL",
  "NAVBAR",
  "LOGIN_REGISTER",
  "USER_ROLE_VALIDATION",
  "ADMIN_PANEL",
  "USER_ROLE_FORMS"
}

export interface PropPair {
  EN?: string;
  DE?: string;
  UA?: string;
  RU?: string;
}

export interface TextResources {
  [key: string]: PropPair;
}

export interface LocalizedTextResources {
  [key: string]: string;
}
