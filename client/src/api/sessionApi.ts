import {
  client,
  HOST,
  PORT,
  USER_API,
  OPTIONS,
  OPTIONS_WITH_TOKEN,
  ApiCallResponse,
} from "./apiSettingsAndMethods";
import { LoginInput } from "../store/features/appSettings.types";

export const loginApiCall = async (
  loginInput: LoginInput
): Promise<ApiCallResponse> => {
  let response;
  try {
    response = await client.post(`${USER_API}/login`, loginInput, {
      ...OPTIONS,
    });
  } catch (e: any) {
    response = e.response;
  }

  if (response.status === 401) {
    // wrong login credentials provided
    return { error: true, data: response.data[0] };
  }

  if (response.status === 200) {
    // process successful login response
    return { data: response.data };
  }

  throw new Error("Something is wrong with API. Investigation required");
};
