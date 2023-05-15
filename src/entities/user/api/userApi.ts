import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils/types";
import {
    GetAdminStudentsFiltersResponse,
    UpdateUserRequest,
    CreateUserRequest,
    UserCreateResponse,
    UserDetailResponse,
    UsersRequestParamsType,
    ChangeUserPasswordRequest,
    UpdateActivityStatusUserRequest,
    $GetUsersResponse,
    GetUsersResponse,
    $GetUsersAdminFiltersResponse,
    GetUsersAdminFiltersResponse,
    $UserDetailResponse,
    $UserCreateResponse,
    $GetAdminStudentsFiltersResponse,
} from "./types";

export class UsersApi extends BaseApi {
    async getUsers({ roleName, isActive, ...params }: UsersRequestParamsType): Promise<GetUsersResponse> {
        const result = await this.instance.post("admin/users/list", {
            ...params,
            filter: {
                roleName,
                isActive,
            },
        });
        return $GetUsersResponse.parse(result);
    }

    async getAdminUsers({ roleName, isActive, ...params }: UsersRequestParamsType): Promise<GetUsersResponse> {
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
        return $GetUsersResponse.parse(result);
    }

    async getAdminUsersFilters(): Promise<GetUsersAdminFiltersResponse> {
        const result = await this.instance.get("admin/users/administrators/resources");
        return $GetUsersAdminFiltersResponse.parse(result);
    }

    async deleteUser(id: string): Promise<void> {
        await this.instance.delete(`admin/users/${id}`);
    }

    async updateActivityStatusUser({ id, isActive }: UpdateActivityStatusUserRequest): Promise<void> {
        //TODO: Добавить респонс как бекенд добавит { isActive: boolean }
        await this.instance.put(`admin/users/${id}/activity-status`, { isActive });
    }

    async showUser(id: string): Promise<UserDetailResponse> {
        const result = await this.instance.get(`admin/users/${id}`);
        return $UserDetailResponse.parse(result);
    }

    async createUser(data: CreateUserRequest): Promise<UserCreateResponse> {
        const result = await this.instance.post("admin/users", data);
        return $UserCreateResponse.parse(result);
    }

    async updateUser({ id, ...data }: UpdateUserRequest & { id?: number }): Promise<UserDetailResponse> {
        const result = await this.instance.put(`admin/users/${id}`, data);
        return $UserDetailResponse.parse(result);
    }

    async updateUserPassword({ id, ...data }: ChangeUserPasswordRequest): Promise<void> {
        await this.instance.put(`admin/users/${id}/change-password`, data);
    }

    //students
    async getAdminStudentsFilters(): Promise<GetAdminStudentsFiltersResponse> {
        const result = await this.instance.get("admin/users/students/resources");
        return $GetAdminStudentsFiltersResponse.parse(result);
    }
}

export const usersApi = new UsersApi(axios);
