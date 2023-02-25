// this file contains copies from front end input input validation schemas with some modifications.
// at this phase I have decided not to organize anything like sharing
// types / interfaces between front end and back end and just copied them to this file

// IF SOMETHING IS NOT WORKING WITH API CALL PLEASE CHECK THIS FIRST

import { object, string, TypeOf, optional, number, boolean } from "zod";
import store from "../store/store";
import {
  addressTextRegex,
  longTextRegex,
  nameRegex,
  phoneNumberTextRegex,
} from "./userAndRoleRegexes";
import { getTextResources } from "../resources/getTextResources";
import { AppLanguageOptions, FormsNames } from "../resources/getTextResources.types";


// get global app language settings from the store and get localized text resources
const storeState = store.getState();

const textRes = getTextResources(storeState.appState.value.appLanguage, FormsNames.USER_ROLE_VALIDATION);

// schema for checking login data
export const loginDataSchema = object({
  email: string({ required_error: "email is required" }).min(
    1,
    `${textRes.minOneCharEmailMessage}`
  ),
  password: string({ required_error: "password is required" }).min(
    1,
    `${textRes.minOneCharPasswordMessage}`
  ),
});
export type LoginDataInput = TypeOf<typeof loginDataSchema>;

export const createUserSchema = object({
  email: string({ required_error: `${textRes.emailIsRequiredMessage}` }).email(
    `${textRes.emailNotValidMessage}`
  ),
  password: string({ required_error: `${textRes.passwordIsRequiredMessage}` }).min(
    6,
    `${textRes.passwordMin6CharsMessage}`
  ),
  confirmPassword: string({
    required_error: `${textRes.passwordIsRequiredMessage}`,
  }).min(6, `${textRes.passwordMin6CharsMessage}`),
  name: string({ required_error: `${textRes.nameIsRequiredMessage}` })
    .min(2, `${textRes.nameMin2CharsMessage}`)
    .regex(nameRegex, `${textRes.nameWrongFormatMessage}`),
  familyname: optional(
    string()
      .min(2, `${textRes.familynameMin2CharsMessage}`)
      .regex(nameRegex, `${textRes.familynameWrongFormatMessage}`)
  ),
  phone: optional(
    string()
      .min(6, `${textRes.phoneMin6CharsMessage}`)
      .regex(phoneNumberTextRegex, `${textRes.phoneWrongFormatMessage}`)
  ),
  address: optional(
    string()
      .min(6, `${textRes.addressMin6CharsMessage}`)
      .regex(addressTextRegex, `${textRes.addressWrongFormatMessage}`)
  ),
  company: optional(
    string()
      .min(2, `${textRes.companyMin2CharsMessage}`)
      .regex(nameRegex, `${textRes.companyWrongFormatMessage}`)
  ),
  position: optional(
    string()
      .min(2, `${textRes.positionMin2CharsMessage}`)
      .regex(nameRegex, `${textRes.positionWrongFormatMessage}`)
  ),
  description: optional(
    string()
      .min(6, `${textRes.descriptionMin6CharsMessage}`)
      .regex(longTextRegex, `${textRes.descriptionWrongFormatMessage}`)
  ),
  userrole_id: string({ required_error: `${textRes.roleIsRequiredMessage}` }).refine(
    (id) => {
      const latestStore = store.getState();
      if (
        latestStore.usersRoles.value.appRoles?.filter((role) => role._id === id.toString())
          .length === 0
      ) {
        return false;
      } else {
        return true;
      }
    },
    { message: `${textRes.roleIsWrongMessage}` }
  ),
}).refine(
  (it) => {
    if (it.password !== it.confirmPassword) {
      return false;
    } else {
      return true;
    }
  },
  { message: `${textRes.passwordsDoNotMatchMessage}` }
);

export type CreateUserInput = TypeOf<typeof createUserSchema>;

export const putUserSchema = object({
  _id: string({ required_error: `${textRes.userIdIsRequired}` }).refine(
    (id) => id.match(/^[0-9a-fA-F]{24}$/), // TODO - replace to regex folder and test
    { message: `${textRes.userIdIsNotValid}` }
  ),
  __v: number({ required_error: "this is fake user" }),
  isConfirmed: boolean({ required_error: `${textRes.isConfirmedIsRequiredMessage}` }),
  email: string({ required_error: `${textRes.emailIsRequiredMessage}` }).email(
    `${textRes.emailNotValidMessage}`
  ),
  password: optional(string().min(6, `${textRes.passwordMin6CharsMessage}`)),
  name: string({ required_error: `${textRes.nameIsRequiredMessage}` })
    .min(2, `${textRes.nameMin2CharsMessage}`)
    .regex(nameRegex, `${textRes.nameWrongFormatMessage}`),
  familyname: optional(
    string()
      .min(2, `${textRes.familynameMin2CharsMessage}`)
      .regex(nameRegex, `${textRes.familynameWrongFormatMessage}`)
  ),
  phone: optional(
    string()
      .min(6, `${textRes.phoneMin6CharsMessage}`)
      .regex(phoneNumberTextRegex, `${textRes.phoneWrongFormatMessage}`)
  ),
  address: optional(
    string()
      .min(6, `${textRes.addressMin6CharsMessage}`)
      .regex(addressTextRegex, `${textRes.addressWrongFormatMessage}`)
  ),
  company: optional(
    string()
      .min(2, `${textRes.companyMin2CharsMessage}`)
      .regex(nameRegex, `${textRes.companyWrongFormatMessage}`)
  ),
  position: optional(
    string()
      .min(2, `${textRes.positionMin2CharsMessage}`)
      .regex(nameRegex, `${textRes.positionWrongFormatMessage}`)
  ),
  description: optional(
    string()
      .min(6, `${textRes.descriptionMin6CharsMessage}`)
      .regex(longTextRegex, `${textRes.descriptionWrongFormatMessage}`)
  ),
  createdAt: string({ required_error: "this is fake user" }).refine(
    (dateString) => {
      const date = Date.parse(dateString);
      if (date) {
        return true;
      } else {
        return false;
      }
    },
    { message: "this is fake user" }
  ),
  updatedAt: string({ required_error: "this is fake user" }).refine(
    (dateString) => {
      const date = Date.parse(dateString);
      if (date) {
        return true;
      } else {
        return false;
      }
    },
    { message: "this is fake user" }
  ),
  userrole_id: string({ required_error: `${textRes.roleIsRequiredMessage}` }).refine(
    (id) => id.match(/^[0-9a-fA-F]{24}$/), // TODO - replace to regex folder and test
    {
      message: `${textRes.roleIsWrongMessage}`,
    }
  ),
});

export type PutUserInput = TypeOf<typeof putUserSchema>;

export const roleSchema = object({
  role: string({ required_error: `${textRes.roleNameIsRequiredMessage}` })
    .min(4, `${textRes.roleNameMin4CharsMessage}`)
    .regex(nameRegex, `${textRes.roleNameWrongFormatMessage}`),
  description: optional(
    string()
      .min(6, `${textRes.roleDescMin6CharsMessage}`)
      .regex(longTextRegex, `${textRes.roleDescWrongFormatMessage}`)
  ),
});

export type RoleInputSchemaType = TypeOf<typeof roleSchema>;

export const passwordCheckSchema = object({
  oldPassword: optional(string()),
  password: optional(string().min(6, `${textRes.passwordMin6CharsMessage}`)),
  confirmPassword: optional(string().min(6, `${textRes.passwordMin6CharsMessage}`)),
})
  .refine(
    (it) => {
      if (it.password !== it.confirmPassword) {
        return false;
      } else {
        return true;
      }
    },
    { message: `${textRes.passwordsDoNotMatchMessage}` }
  )
  .refine(
    (it) => {
      if (it.oldPassword && it.oldPassword === it.password) {
        return false;
      } else {
        return true;
      }
    },
    {
      message: `${textRes.oldAndNewPasswordsMatchMessage}`,
    }
  );

export type PasswordCheckInputType = TypeOf<typeof passwordCheckSchema>;

export const passwordSubmitSchema = object({
  oldPassword: optional(string()),
  password: string({ required_error: textRes.passwordIsRequiredMessage }).min(
    6,
    `${textRes.passwordMin6CharsMessage}`
  ),
  confirmPassword: string({ required_error: textRes.passwordIsRequiredMessage }).min(
    6,
    `${textRes.passwordMin6CharsMessage}`
  ),
})
  .refine(
    (it) => {
      if (it.password !== it.confirmPassword) {
        return false;
      } else {
        return true;
      }
    },
    { message: `${textRes.passwordsDoNotMatchMessage}` }
  )
  .refine(
    (it) => {
      if (it.oldPassword && it.oldPassword === it.password) {
        return false;
      } else {
        return true;
      }
    },
    {
      message: `${textRes.oldAndNewPasswordsMatchMessage}`,
    }
  );

export type PasswordSubmitInputType = TypeOf<typeof passwordSubmitSchema>;