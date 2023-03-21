import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import { GetMeResponse } from "./types";

class AuthApi extends BaseApi {
    getMe(): Promise<GetMeResponse> {
        return this.instance.get("authentication/user");
    }
}

export const authApi = new AuthApi(axios);
