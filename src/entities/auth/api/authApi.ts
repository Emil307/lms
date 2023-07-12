import { axios } from "@app/config/axios";
import { $AuthFormValidationSchema, AuthData } from "@features/auth";
import { BaseApi, HTTPMethod } from "@shared/utils";
import {
    ChangePasswordRequest,
    UpdateMeRequest,
    UpdateMeResponse,
    SignUpRequest,
    SignUpResponse,
    AuthenticateResponse,
    ResetPasswordRequest,
    RecoveryPasswordRequest,
    $User,
    $AuthenticateResponse,
    $SignUpResponse,
    $UpdateMeResponse,
} from "./types";

class AuthApi extends BaseApi {
    getMe = this.createApiMethod({
        method: HTTPMethod.GET,
        path: "authentication/user",
        responseSchema: $User,
    });

    authMe = this.createApiMethod({
        method: HTTPMethod.POST,
        path: `authentication/authenticate`,
        requestSchema: $AuthFormValidationSchema,
        responseSchema: $AuthenticateResponse,
    });
    async authenticateMe(data: AuthData): Promise<AuthenticateResponse> {
        const response = await this.instance.post("authentication/authenticate", data);
        return $AuthenticateResponse.parse(response);
    }
    async signUp(data: SignUpRequest): Promise<SignUpResponse> {
        const response = await this.instance.post("authentication/register", data);
        return $SignUpResponse.parse(response);
    }
    async updateMe(data: UpdateMeRequest): Promise<UpdateMeResponse> {
        const response = await this.instance.put("me/update", data);
        return $UpdateMeResponse.parse(response);
    }
    changePassword(payload: ChangePasswordRequest): Promise<void> {
        return this.instance.put("me/change-password", payload);
    }
    recoveryPassword(data: RecoveryPasswordRequest): Promise<void> {
        return this.instance.post("authentication/recovery/password/request", data);
    }
    resetPassword(data: ResetPasswordRequest): Promise<void> {
        return this.instance.post("authentication/recovery/password/reset", data);
    }
}

export const authApi = new AuthApi(axios);
