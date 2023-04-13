import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils/types";
import {
    $getAdminStudentsFiltersResponse,
    $userCreateResponse,
    $userDetailResponse,
    $usersAdministratorsCreateOptions,
    $usersAdministratorsFilters,
    $usersResponse,
    GetAdminStudentsFiltersResponse,
    UpdateUserRequest,
    CreateUserRequest,
    UserCreateResponse,
    UserDetailResponse,
    UsersAdministratorsCreateOptionsResponse,
    UsersAdministratorsFiltersResponse,
    UsersRequestParamsType,
    UsersResponseType,
} from "./types";

export class UsersApi extends BaseApi {
    async getUsers(params: UsersRequestParamsType): Promise<UsersResponseType> {
        const result = await axios.get("admin/users", {
            params: {
                ...params,
                filter: params.filters,
                sort: params.sorting?.[0] ? { [params.sorting[0].id]: params.sorting[0].desc ? "desc" : "asc" } : null,
            },
        });
        return $usersResponse.parse(result);
    }

    async getAdminUsers(params: UsersRequestParamsType): Promise<UsersResponseType> {
        const result = await axios.get("admin/users/administrators", {
            params: {
                ...params,
                filter: params.filters,
                sort: params.sorting?.[0] ? { [params.sorting[0].id]: params.sorting[0].desc ? "desc" : "asc" } : null,
            },
        });
        return $usersResponse.parse(result);
    }

    async getAdminUsersFilters(): Promise<UsersAdministratorsFiltersResponse> {
        const result = await axios.get("admin/users/administrators/filters");
        return $usersAdministratorsFilters.parse(result);
    }

    async getUsersAdminCreateOptions(): Promise<UsersAdministratorsCreateOptionsResponse> {
        const result = await axios.get("admin/users/administrators/create");
        return $usersAdministratorsCreateOptions.parse(result);
    }

    async deleteUser(id: string): Promise<void> {
        await axios.delete(`admin/users/${id}`);
    }

    async activateUser(id: string): Promise<void> {
        await axios.put(`admin/users/${id}/activate`);
    }

    async deactivateUser(id: string): Promise<void> {
        await axios.put(`admin/users/${id}/deactivate`);
    }

    async getDetailUser(id: string): Promise<UserDetailResponse> {
        const result = await axios.get(`admin/users/${id}`);
        return $userDetailResponse.parse(result);
    }

    async createUser(data: CreateUserRequest): Promise<UserCreateResponse> {
        const result = await axios.post("admin/users", data);
        return $userCreateResponse.parse(result);
    }

    async updateUser({ id, ...data }: UpdateUserRequest & { id?: string }): Promise<UserDetailResponse> {
        const result = await axios.put(`admin/users/${id}`, data);
        return $userDetailResponse.parse(result);
    }

    //students
    async getAdminStudentsFilters(): Promise<GetAdminStudentsFiltersResponse> {
        const result = await axios.get("admin/users/students/filters");
        return $getAdminStudentsFiltersResponse.parse(result);
    }
}

export const usersApi = new UsersApi(axios);