import { CookiesData } from "../store/features/appState.types";
import {
  client,
  HOST,
  PORT,
  ROLE_API,
  OPTIONS,
  OPTIONS_WITH_TOKEN,
  processResponse,
  ApiCallResponse,
  apiCallWithAuth,
} from "./apiSettingsAndMethods";

export const fetchPublicRolesApiCall = async (): Promise<ApiCallResponse> => {
  const response = await client
    .get(`${ROLE_API}`, {
      ...OPTIONS,
    })
    .catch((e) => {
      return processResponse(e.response);
    });
  return processResponse(response);
};

export const fetchAllRolesApiCall = async (
  accessToken: string
): Promise<ApiCallResponse> => {
  const response = await apiCallWithAuth(() =>
    client.get(`${ROLE_API}/allroles`, {
      ...OPTIONS_WITH_TOKEN(accessToken),
    })
  );
  return response as ApiCallResponse;
};
