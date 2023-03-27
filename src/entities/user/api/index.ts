import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils/types";
import { $userDetailResponse, $usersResponse, UserDetailResponseType, UsersRequestParamsType, UsersResponseType } from "./types";

export class UsersApi extends BaseApi {
    async getUsers(params: UsersRequestParamsType): Promise<UsersResponseType> {
        const result = await axios.get("admin/users", {
            // TODO - посмотреть что будет на бэке на следующих индексовых страницах, написать универсальные функции для параметров
            params: {
                ...params,
                filter: params.filters,
                sort: params.sorting?.[0] ? { [params.sorting[0].id]: params.sorting[0].desc ? "desc" : "asc" } : null,
            },
        });
        return $usersResponse.parse(result);
    }

    async deleteUser(id: string) {
        const result = await axios.delete(`admin/users/${id}`);
        return result;
    }

    async getDetailUser(id: string): Promise<UserDetailResponseType> {
        const result = await axios.get(`admin/users/${id}`);
        return $userDetailResponse.parse(result);
    }
}

export const usersApi = new UsersApi(axios);
