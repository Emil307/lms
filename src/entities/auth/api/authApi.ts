import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import { ChangePasswordRequest, GetMeResponse, UpdateMeRequest, UpdateMeResponse } from "./types";

class AuthApi extends BaseApi {
    getMe(): Promise<GetMeResponse> {
        return this.instance.get("authentication/user");
    }
    updateMe(data: UpdateMeRequest): Promise<UpdateMeResponse> {
        return this.instance.put("me/update", { data });
    }
    changePassword(payload: ChangePasswordRequest): Promise<void> {
        return this.instance.put("me/change-password", payload);
    }
}

export const authApi = new AuthApi(axios);
