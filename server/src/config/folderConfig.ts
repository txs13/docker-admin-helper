import dotenv from "dotenv";
import path from "path";

dotenv.config();

const devModeString = process.env.MODE_ENV;
let keysFolder: string = "";
let globalRootFolder: string = "";
let rootFolder: string = "";
switch (devModeString) {
  case "DEV":
    globalRootFolder = path.join(__dirname, "..", "..", "..");
    keysFolder = path.join(globalRootFolder, "keys");
    rootFolder = path.join(globalRootFolder, "build");
    break;
  case "PROD":
    globalRootFolder = path.join(__dirname, "..", "..");
    keysFolder = path.join(globalRootFolder, "keys");
    rootFolder = path.join(globalRootFolder, "build");
    break;
  default:
    globalRootFolder = path.join(__dirname, "..", "..", "..");
    keysFolder = path.join(globalRootFolder, "keys");
    rootFolder = path.join(globalRootFolder, "build");
    break;
}

export { keysFolder, globalRootFolder, rootFolder };
