import { axios } from "@app/config/axios";
import { AuthData } from "@features/auth";
import { BaseApi } from "@shared/utils";
import {
    ChangePasswordRequest,
    User,
    UpdateMeRequest,
    UpdateMeResponse,
    SignUpRequest,
    $user,
    $signUpResponse,
    SignUpResponse,
    $updateMeResponse,
    AuthenticateResponse,
    $authenticateResponse,
    ResetPasswordRequest,
    RecoveryPasswordRequest,
} from "./types";

class AuthApi extends BaseApi {
    async getMe(): Promise<User> {
        const response = await this.instance.get("authentication/user");
        return $user.parse(response);
    }
    async authenticateMe(data: AuthData): Promise<AuthenticateResponse> {
        const response = await this.instance.post("authentication/authenticate", data);
        return $authenticateResponse.parse(response);
    }
    async signUp(data: SignUpRequest): Promise<SignUpResponse> {
        const response = await this.instance.post("authentication/register", data);
        return $signUpResponse.parse(response);
    }
    async updateMe(data: UpdateMeRequest): Promise<UpdateMeResponse> {
        const response = this.instance.put("me/update", data);
        return $updateMeResponse.parse(response);
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
