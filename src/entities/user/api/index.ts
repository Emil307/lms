import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils/types";
import { $userDetailResponse, $usersResponse, UserDetailResponse, UsersResponseType } from "./types";

export class UsersApi extends BaseApi {
    async getUsers(params: any): Promise<UsersResponseType> {
        const result = await axios.get("admin/users", { params: { ...params, sort: JSON.parse(params.sort ?? "{}") } });
        return $usersResponse.parse(result);
    }

    async deleteUser(id: string) {
        const result = await axios.delete(`admin/users/${id}`);
        return result;
    }

    async getDetailUser(id: string): Promise<UserDetailResponse> {
        const result = await axios.get(`admin/users/${id}`);
        return $userDetailResponse.parse(result);
    }
}

export const usersApi = new UsersApi(axios);
