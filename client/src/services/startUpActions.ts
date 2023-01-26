import { RootState } from "../store/store"
 
import { RefreshInfo } from "../store/features/appSettings.slice"

const startUpActions = async (store: RootState) => {
    //TODO: fetch public roles
    
    //read local storage: token, user email, etc.
    //it is defined, that the following item key is going to be used
    //to store all the refresh app information: "refreshinfo"
    let refreshInfo: RefreshInfo = {};
    const storageRefreshInfo = localStorage.getItem("refreshinfo");
    if (storageRefreshInfo) {
        refreshInfo = JSON.parse(storageRefreshInfo);
    }

}

export default startUpActions