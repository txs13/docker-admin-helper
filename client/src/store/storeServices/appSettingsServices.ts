import { updateAppSettings } from "../features/appSettings.slice";
import { LoginInput } from "../features/appSettings.types";
import store from "../store";
import { loginApiCall } from "../../api/sessionApi";


export const loginService = async (loginInput: LoginInput) => {
    const loginData = await loginApiCall(loginInput);

    if (!loginData.error) {
        
    }
}