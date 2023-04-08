import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { keysFolder } from "./folderConfig";
dotenv.config();

// detect docker mode and app mode
// process.env.NODE_ENV is either "docker" when is run in docker and undefined when run locally
let appMode = process.env.NODE_ENV;
if (!appMode) {
  appMode = "local";
}

// process.env.MODE_ENV is either "DEV" or "PROD" when is run in development or production mode
let devModeString = process.env.MODE_ENV;
let devMode: boolean = true;
switch (devModeString) {
  case "DEV":
    devMode = true;
    break;
  case "PROD":
    devMode = false;
    break;
  default:
    devMode = true;
    break;
}

dotenv.config({path: "../.env"})

const getEnvVars = (): {
  devMode: boolean;
  host: string;
  port: number;
  dbUri: string;
  dbName: string;
  testDbName: string;
  saltWorkFactor: number;
  accessTokenTtl: number;
  refreshTokenTtl: number;
  privKey: string;
  pubKey: string;
  prodMode: boolean;
} => {
  // .env parameters are read
  const devHost = process.env.DEV_HOST as string;
  const devPort = Number(process.env.DEV_PORT);
  const prodHost = process.env.PROD_HOST as string;
  const prodPort = Number(process.env.PROD_PORT);
  const nodeProdMode = process.env.APP_MODE as string;
  let dbUri: string = "";
  let dbName: string = "";
  const testDbName = process.env.DB_NAME_TESTS as string;
  const saltWorkFactor = Number(process.env.SALT_WORK_FACTOR);
  const accessTokenTtl = Number(process.env.ACCESS_TOKEN_TTL);
  const refreshTokenTtl = Number(process.env.REFRESH_TOKEN_TTL);

  // assign right values depending on the app mode
  const host = devMode ? devHost : prodHost;
  const port = devMode ? devPort : prodPort;
  if (devMode) {
    dbName = process.env.DB_NAME_DEV as string;
    if (appMode === "docker") {
      dbUri = process.env.DB_URI_DOCKER_DEV as string;
    } else {
      dbUri = process.env.DB_URI_DEV as string;
    }
  } else {
    dbName = process.env.DB_NAME_PROD as string;
    if (appMode === "docker") {
      dbUri = process.env.DB_URI_DOCKER_PROD as string;
    } else {
      dbUri = process.env.DB_URI_PROD as string;
    }
  }

  const privKey = fs.readFileSync(
    path.join(keysFolder, "id_rsa_priv.pem"),
    "utf8"
  ) as string;
  const pubKey = fs.readFileSync(
    path.join(keysFolder, "id_rsa_pub.pem"),
    "utf8"
  ) as string;

  return {
    devMode: devMode,
    host: host,
    port: port,
    dbUri: dbUri,
    dbName: dbName,
    testDbName: testDbName,
    saltWorkFactor: saltWorkFactor,
    accessTokenTtl: accessTokenTtl,
    refreshTokenTtl: refreshTokenTtl,
    privKey: privKey,
    pubKey: pubKey,
    prodMode: !devMode,
  };
};

export default getEnvVars;
