import axios from "axios";

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
  error?: boolean;
}

const apiCallWithAuth = async (
  apiFunction: Function,
  secondCall = false
): Promise<ApiCallResponse | Function> => {
  const response = await apiFunction();
  if (response.status === 200 || response.status === 201) {
    return { data: response.body };
  } else if (response.status === 401 && !secondCall) {
    // refresh token
    // TODO: call refresh token service
    return await apiCallWithAuth(apiFunction, true);
  } else if (response.status === 401 && secondCall) {
    // return expired token message
    return { data: response.body, error: true };
  }
  return { data: { message: "Unknown error" }, error: true };
};

const processResponse = (response?: any): ApiCallResponse => {
  
  // api call was successful
  if (response && (response.status === 200 || response.status === 201)) {
    return { data: response.data };
  }

  // api call was NOT successful
  if (response && (response.status === 401 || response.status === 400)) {
    return { error: true, data: response.data[0] };
  }

  return { data: { message: "Unknown error" }, error: true };
}

const client = axios.create({
  baseURL: `http://${HOST}:${PORT}`,
  timeout: 1000,
});

export {
  HOST,
  PORT,
  USER_API,
  ROLE_API,
  OPTIONS,
  OPTIONS_WITH_TOKEN,
  apiCallWithAuth,
  processResponse,
  client,
};
