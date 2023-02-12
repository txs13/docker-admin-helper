import { AppLanguageOptions } from "../../resources/getTextResources.types";

export interface AppState {
  globalLoading: boolean;
  globalError?: string;
  globalWarning?: string;
  globalMessage?: string;
  appLanguage: AppLanguageOptions;
}
