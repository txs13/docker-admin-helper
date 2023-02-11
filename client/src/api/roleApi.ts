import {
  client,
  HOST,
  PORT,
  ROLE_API,
  OPTIONS,
  OPTIONS_WITH_TOKEN,
  processResponse,
  ApiCallResponse,
} from "./apiSettingsAndMethods";

export const fetchPublicRoles = async (): Promise<ApiCallResponse> => {
    const response = await client.get(`${ROLE_API}`, {
      ...OPTIONS,
    }).catch((e) => {
        return processResponse(e.response);
    });
    return processResponse(response);
};
