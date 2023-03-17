import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils/types";
import { $usersResponse, UsersResponseType } from "./types";

export class UsersApi extends BaseApi {
    async getUsers(params: any): Promise<UsersResponseType> {
        const result = await axios.get("admin/users", { params: { ...params, sort: JSON.parse(params.sort ?? "{}") } });
        return $usersResponse.parse(result);
    }
}

export const usersApi = new UsersApi(axios);
