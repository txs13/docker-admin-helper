import {
  client,
  HOST,
  PORT,
  USER_API,
  OPTIONS,
  OPTIONS_WITH_TOKEN,
  ApiCallResponse,
  processResponse
} from "./apiSettingsAndMethods";
import { LoginInput } from "../store/features/appSettings.types";

export const loginApiCall = async (
  loginInput: LoginInput
): Promise<ApiCallResponse> => {
    const response = await client.post(`${USER_API}/login`, loginInput, {
      ...OPTIONS,
    }).catch((e) => {
      return processResponse(e.response);
    });
    return processResponse(response);
};
