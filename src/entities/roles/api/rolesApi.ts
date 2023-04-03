import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import { $rolesResponse, RolesResponseType } from "./types";

export class RolesApi extends BaseApi {
    async getRoles(): Promise<RolesResponseType> {
        const response = await axios.get("authorization/roles");
        return $rolesResponse.parse(response);
    }
}

export const rolesApi = new RolesApi(axios);
