import axios from "axios";
import store from "../store/store";
import { refreshTokenService } from "../store/storeServices/sessionServices";

// the strategy is to take user values if useUserValues is true
// if not, browser server and port are going to taken for data fetching
// --------------------------------------------------------------------
const useUserValues = false;
const userHost = "";
const userPort = 0;
// --------------------------------------------------------------------
let HOST = "";
let PORT = 0;

// if app is working in dev environment it is not going to be valid
// they "standard" dev values are taken. Please adjust if you have changed them
HOST = window.location.hostname;
PORT = Number(window.location.port);
if (HOST === "localhost" && PORT === 3000) {
  HOST = "127.0.0.1";
  PORT = 1337;
}

if (useUserValues) {
  HOST = userHost;
  PORT = userPort;
}

// api routes
const USER_API = "/api/v1/user";
const ROLE_API = "/api/v1/role";

// http request options
const OPTIONS = {
  headers: { "Content-Type": "application/json" },
};

const OPTIONS_WITH_TOKEN = (token: string) => {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
};

export interface ApiCallResponse {
  data: any;
  error: boolean;
}

const processResponse = (response: any): ApiCallResponse => {
  // api call was successful
  if (response.status === 200 || response.status === 201)
  {
    return { error: false, data: response.data };
  }
  // api call was NOT successful
  if (response.status === 401 || response.status === 400) {
    return { error: true, data: { message: response.data[0].message } };
  }

  return { data: { message: "Unknown error" }, error: true };
};

const client = axios.create({
  baseURL: `http://${HOST}:${PORT}`,
  timeout: 1000,
});

interface ApiCallHelperProps {
  method: "GET" | "PUT" | "DELETE" | "POST";
  url: string;
  auth: boolean;
  objectToSend?: object;
}

const apiCallHelper = async ({
  method,
  url,
  auth,
  objectToSend = {},
}: ApiCallHelperProps): Promise<ApiCallResponse> => {
  let cookiesData = store.getState().appState.value.cookiesData;
  let response;
  switch (method) {
    case "GET":
      response = await client
        .get( url, auth ? { ...OPTIONS_WITH_TOKEN(cookiesData?.accessToken as string) } : { ...OPTIONS } )
        .catch((e) => { return e.response; });
      if (response.status === 200 || response.status === 201) {
        return processResponse(response);
      } else if ((response.status === 401 || response.status === 400) && auth) {
        await refreshTokenService();
        cookiesData = store.getState().appState.value.cookiesData;
        response =  await client
          .get( url, auth ? { ...OPTIONS_WITH_TOKEN(cookiesData?.accessToken as string) } : { ...OPTIONS } )
          .catch((e) => { return e.response; });
        return processResponse(response);  
      } else {
        return processResponse(response);
      }

    case "PUT":
      response = await client
        .put( url, {...objectToSend}, auth ? { ...OPTIONS_WITH_TOKEN(cookiesData?.accessToken as string) } : { ...OPTIONS } )
        .catch((e) => { return e.response; });
      if (response.status === 200 || response.status === 201) {
        return processResponse(response);
      } else if ((response.status === 401 || response.status === 400) && auth) {
        await refreshTokenService();
        cookiesData = store.getState().appState.value.cookiesData;
        response = await client
          .put( url, {...objectToSend}, auth ? { ...OPTIONS_WITH_TOKEN(cookiesData?.accessToken as string) } : { ...OPTIONS } )
          .catch((e) => { return e.response; });
        return processResponse(response);
      } else {
        return processResponse(response);
      }

    case "POST":
      response = await client
        .post( url, {...objectToSend}, auth ? { ...OPTIONS_WITH_TOKEN(cookiesData?.accessToken as string) } : { ...OPTIONS } )
        .catch((e) => { return e.response; });
      if (response.status === 200 || response.status === 201) {
        return processResponse(response);
      } else if ((response.status === 401 || response.status === 400) && auth) {
        await refreshTokenService();
        cookiesData = store.getState().appState.value.cookiesData;
        response = await client
          .post( url, {...objectToSend}, auth ? { ...OPTIONS_WITH_TOKEN(cookiesData?.accessToken as string) } : { ...OPTIONS } )
          .catch((e) => { return e.response; });
        return processResponse(response);  
      } else {
        return processResponse(response);
      }

    case "DELETE":
      response = await client
        .delete( url, auth ? { ...OPTIONS_WITH_TOKEN(cookiesData?.accessToken as string) } : { ...OPTIONS } )
        .catch((e) => { return e.response; });
      if (response.status === 200 || response.status === 201) {
        return processResponse(response);
      } else if ((response.status === 401 || response.status === 400) && auth) {
        await refreshTokenService();
        cookiesData = store.getState().appState.value.cookiesData;
        response = await client
          .delete( url, auth ? { ...OPTIONS_WITH_TOKEN(cookiesData?.accessToken as string) } : { ...OPTIONS } )
          .catch((e) => { return e.response; });
        return processResponse(response);  
      } else {
        return processResponse(response);
      }
  }
};

const refreshTokenApiCall = async (
  refreshToken: string
): Promise<ApiCallResponse> => {
  const response = await client
    .post(`${USER_API}/refresh`, {}, { ...OPTIONS_WITH_TOKEN(refreshToken) })
    .catch((e) => {
      return e.response;
    });
  return processResponse(response);
};

export {
  USER_API,
  ROLE_API,
  apiCallHelper,
  refreshTokenApiCall,
};
