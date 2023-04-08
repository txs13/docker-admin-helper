import log from "./utils/logger";
import checkKeyPair from './utils/checkKeyPair'

// the purpose of this function is to call app modules import and the app itself only
// after keys are checked / generated 
const systemStart = async () => {  
  // getting environmental variables
  const getEnvVars = (await import("./config/config")).default;
  const { host, port, prodMode, dbName, dbUri } = getEnvVars();
  
  // connect database and check default entities
  const dbConnect = (await import("./utils/dbConnect")).default;
  await dbConnect(dbUri, dbName);
  
  // console info if production mode
  if(prodMode) {
    log.info("Production Mode is ON")
  }
  
  // starting api listener
  const app = (await import("./app")).default;
  app.listen(port, host, () => {
    log.info(`Server is listening at http://${host}:${port}`);
  });
};

// checking keys and generating key pair when it is necessary
const keysAreOk = checkKeyPair()
if (keysAreOk) {
  log.info("Encryption keys are OK");
  systemStart()
} else {
    log.error('Encryptions keys are corrupted. Check the database before deleting/replacing them!')
    process.exit(1)
}
