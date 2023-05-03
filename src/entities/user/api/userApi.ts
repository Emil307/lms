import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils/types";
import {
    $getAdminStudentsFiltersResponse,
    $userCreateResponse,
    $userDetailResponse,
    $usersAdministratorsFilters,
    $usersResponse,
    GetAdminStudentsFiltersResponse,
    UpdateUserRequest,
    CreateUserRequest,
    UserCreateResponse,
    UserDetailResponse,
    UsersAdministratorsFiltersResponse,
    UsersRequestParamsType,
    UsersResponseType,
    ChangeUserActivityStatusRequest,
    ChangeUserPasswordRequest,
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
        const result = await this.instance.post(
            "admin/users/administrators/list",
            {},
            {
                params: {
                    ...params,
                    filter: {
                        roleName,
                        isActive,
                    },
                },
            }
        );
        return $usersResponse.parse(result);
    }

    async getAdminUsersFilters(): Promise<UsersAdministratorsFiltersResponse> {
        const result = await this.instance.get("admin/users/administrators/resources");
        return $usersAdministratorsFilters.parse(result);
    }

    async deleteUser(id: string): Promise<void> {
        await this.instance.delete(`admin/users/${id}`);
    }

    async changeUserActivityStatus({ id, isActive }: ChangeUserActivityStatusRequest): Promise<void> {
        await this.instance.put(`admin/users/${id}/activity-status`, { isActive });
    }

    async getDetailUser(id: string): Promise<UserDetailResponse> {
        const result = await this.instance.get(`admin/users/${id}`);
        return $userDetailResponse.parse(result);
    }

    async createUser(data: CreateUserRequest): Promise<UserCreateResponse> {
        const result = await this.instance.post("admin/users", data);
        return $userCreateResponse.parse(result);
    }

    async updateUser({ id, ...data }: UpdateUserRequest & { id?: number }): Promise<UserDetailResponse> {
        const result = await this.instance.put(`admin/users/${id}`, data);
        return $userDetailResponse.parse(result);
    }

    async changeUserPassword({ id, ...data }: ChangeUserPasswordRequest): Promise<void> {
        await this.instance.put(`admin/users/${id}/change-password`, data);
    }

    //students
    async getAdminStudentsFilters(): Promise<GetAdminStudentsFiltersResponse> {
        const result = await this.instance.get("admin/users/students/resources");
        return $getAdminStudentsFiltersResponse.parse(result);
    }
}

export const usersApi = new UsersApi(axios);
