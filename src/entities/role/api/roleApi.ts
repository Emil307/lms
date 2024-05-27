import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import { $GetRolesResponse, GetRolesResponse } from "./types";

export class RoleApi extends BaseApi {
    async getRoles(): Promise<GetRolesResponse> {
        const response = await axios.post("auth/authorization/roles/list");
        return $GetRolesResponse.parse(response);
    }
}

export const roleApi = new RoleApi(axios);
