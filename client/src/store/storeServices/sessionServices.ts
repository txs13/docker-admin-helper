import { loginApiCall } from "../../api/sessionApi"
import { LoginInput } from "../features/appState.types"

interface LoginServiceResponse {
    error: boolean;
    errorMessage?: string;
}

export const loginService = async (loginInput: LoginInput): Promise<LoginServiceResponse> => {
    const loginResponse = await loginApiCall(loginInput);
    console.log(loginResponse);

    return {error:true}
}

export const logoutService = async () => {

}