import {
  AppLanguageOptions,
  LocalizedTextResources,
  PropPair,
  TextResources,
  FormsNames,
} from "./getTextResources.types";
// for the purpose of the readability of text resources I decided to split all
// the text labels between files - otherwise it becomes very difficult to find
// a required record
import { loginRegisterTextRes } from "./textResources/loginRegisterTextRes";
import { navbarTextRes } from "./textResources/navbarTextRes";
import { appGeneralTextRes } from "./textResources/appGeneralTextRes";

// some labels / names could be similar on several forms - thus I decided not
// to combine all the file into one, but to call file name to get the names from
// the proper file
const getTextFile = (file: FormsNames): TextResources => {
  switch (file) {
    case FormsNames.APP_GENERAL:
      return appGeneralTextRes;

    case FormsNames.NAVBAR:
      return navbarTextRes;

    case FormsNames.LOGIN_REGISTER:
      return loginRegisterTextRes;
  }
};

export const getTextResources = (
  language: AppLanguageOptions,
  file: FormsNames
) => {
  const textResources: LocalizedTextResources = {};
  const textResourcesMultilang: TextResources = getTextFile(file);
  for (let prop in textResourcesMultilang) {
    const item: PropPair = textResourcesMultilang[prop];
    const languageSettings = AppLanguageOptions[language] as keyof PropPair;
    if (item[languageSettings]) {
      textResources[prop] = item[languageSettings] as string;
    } else {
      textResources[prop] = "...";
    }
  }
  return textResources;
};
