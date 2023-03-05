import {
  client,
  HOST,
  PORT,
  USER_API,
  OPTIONS,
  OPTIONS_WITH_TOKEN,
  ApiCallResponse,
  processResponse,
} from "./apiSettingsAndMethods";
import { LoginInput } from "../store/features/appState.types";

export const loginApiCall = async (
  loginInput: LoginInput
): Promise<ApiCallResponse> => {
  const response = await client
    .post(`${USER_API}/login`, loginInput, {
      ...OPTIONS,
    })
    .catch((e) => {
      return e.response;
    });
  return processResponse(response);
};

export const refreshTokenApiCall = async (
  refreshToken: string
): Promise<ApiCallResponse> => {
  const response = await client
    .post(`${USER_API}/refresh`, {}, { ...OPTIONS_WITH_TOKEN(refreshToken) })
    .catch((e) => {
      return e.response;
    });
  return processResponse(response);
};
