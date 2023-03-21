import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import { ChangePasswordRequest } from "./types";

class AuthApi extends BaseApi {
    changePassword(payload: ChangePasswordRequest): Promise<void> {
        return this.instance.put("me/change-password", payload);
    }
}

export const authApi = new AuthApi(axios);
