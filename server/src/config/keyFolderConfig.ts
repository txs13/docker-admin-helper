import dotenv from "dotenv";
import path from "path";

dotenv.config();

const devModeString = process.env.MODE_ENV;
let keysFolder: string = "";

  switch (devModeString) {
    case "DEV":
      keysFolder = path.join(__dirname, "..", "..", "..", "keys");
      break;
    case "PROD":
      keysFolder = path.join(__dirname, "..", "..", "keys");
      break;
    default:
      keysFolder = path.join(__dirname, "..", "..", "..", "keys");
      break;
  }

export default keysFolder;