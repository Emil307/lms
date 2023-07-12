import { axios } from "@app/config/axios";
import { $AuthFormValidationSchema, AuthFormValidationSchema } from "@features/auth";
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
    RecoveryPasswordResponse,
    $RecoveryPasswordResponse,
    ChangePasswordResponse,
    $ChangePasswordResponse,
    $ResetPasswordResponse,
    ResetPasswordResponse,
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
    async authenticateMe(data: AuthFormValidationSchema): Promise<AuthenticateResponse> {
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
    async changePassword(payload: ChangePasswordRequest): Promise<ChangePasswordResponse> {
        const response = await this.instance.put("me/change-password", payload);
        return $ChangePasswordResponse.parse(response);
    }
    async recoveryPassword(data: RecoveryPasswordRequest): Promise<RecoveryPasswordResponse> {
        const response = await this.instance.post("authentication/recovery/password/request", data);
        return $RecoveryPasswordResponse.parse(response);
    }
    async resetPassword(data: ResetPasswordRequest): Promise<ResetPasswordResponse> {
        const response = await this.instance.post("authentication/recovery/password/reset", data);
        return $ResetPasswordResponse.parse(response);
    }
}

export const authApi = new AuthApi(axios);
