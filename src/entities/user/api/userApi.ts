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
    async getUsers({ roleName, isActive, ...params }: UsersRequestParamsType): Promise<UsersResponseType> {
        const result = await this.instance.get("admin/users", {
            params: {
                ...params,
                filter: {
                    roleName,
                    isActive,
                },
            },
        });
        return $usersResponse.parse(result);
    }

    async getAdminUsers({ roleName, isActive, ...params }: UsersRequestParamsType): Promise<UsersResponseType> {
        const result = await this.instance.get("admin/users/administrators", {
            params: {
                ...params,
                filter: {
                    roleName,
                    isActive,
                },
            },
        });
        return $usersResponse.parse(result);
    }

    async getAdminUsersFilters(): Promise<UsersAdministratorsFiltersResponse> {
        const result = await this.instance.get("admin/users/administrators/filters");
        return $usersAdministratorsFilters.parse(result);
    }

    async getUsersAdminCreateOptions(): Promise<UsersAdministratorsCreateOptionsResponse> {
        const result = await this.instance.get("admin/users/administrators/create");
        return $usersAdministratorsCreateOptions.parse(result);
    }

    async deleteUser(id: string): Promise<void> {
        await this.instance.delete(`admin/users/${id}`);
    }

    async activateUser(id: string): Promise<void> {
        await this.instance.put(`admin/users/${id}/activate`);
    }

    async deactivateUser(id: string): Promise<void> {
        await this.instance.put(`admin/users/${id}/deactivate`);
    }

    async getDetailUser(id: string): Promise<UserDetailResponse> {
        const result = await this.instance.get(`admin/users/${id}`);
        return $userDetailResponse.parse(result);
    }

    async createUser(data: CreateUserRequest): Promise<UserCreateResponse> {
        const result = await this.instance.post("admin/users", data);
        return $userCreateResponse.parse(result);
    }

    async updateUser({ id, ...data }: UpdateUserRequest & { id?: string }): Promise<UserDetailResponse> {
        const result = await this.instance.put(`admin/users/${id}`, data);
        return $userDetailResponse.parse(result);
    }

    //students
    async getAdminStudentsFilters(): Promise<GetAdminStudentsFiltersResponse> {
        const result = await this.instance.get("admin/users/students/filters");
        return $getAdminStudentsFiltersResponse.parse(result);
    }
}

export const usersApi = new UsersApi(axios);
