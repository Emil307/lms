import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils/types";
import {
    GetAdminStudentsFiltersResponse,
    CreateUserRequest,
    UserDetailResponse,
    UsersRequestParamsType,
    ChangeUserPasswordRequest,
    $GetUsersResponse,
    GetUsersResponse,
    $GetUsersAdminFiltersResponse,
    GetUsersAdminFiltersResponse,
    $UserDetailResponse,
    $GetAdminStudentsFiltersResponse,
    CreateUserResponse,
    $CreateUserResponse,
    UpdateUserActivityRequest,
    GetStaticUsersRequest,
    GetStaticUsersResponse,
    $GetStaticUsersResponse,
    UpdateAdminUserResponse,
    $UpdateAdminUserResponse,
    UpdateAdminUserRequest,
    GetAdminStudentsRequest,
    GetAdminStudentsResponse,
    $GetAdminStudentsResponse,
    UpdateUserActivityResponse,
    $UpdateUserActivityResponse,
    UpdateUserStaticRequest,
    UpdateUserStaticResponse,
    $UpdateUserStaticResponse,
    DeleteUserRequest,
    DeleteUserResponse,
    $DeleteUserResponse,
    ChangeUserPasswordResponse,
    $ChangeUserPasswordResponse,
} from "./types";

export class UserApi extends BaseApi {
    async getAdminUsers({ roleName, isActive, ...params }: UsersRequestParamsType): Promise<GetUsersResponse> {
        const response = await this.instance.post("admin/users/administrators/list", {
            ...params,
            filter: {
                roleName,
                isActive,
            },
        });
        return $GetUsersResponse.parse(response);
    }

    async getAdminUsersFilters(): Promise<GetUsersAdminFiltersResponse> {
        const response = await this.instance.get("admin/users/administrators/filters");
        return $GetUsersAdminFiltersResponse.parse(response);
    }

    async deleteUser({ id }: DeleteUserRequest): Promise<DeleteUserResponse> {
        const response = await this.instance.delete(`admin/users/${id}`);
        return $DeleteUserResponse.parse(response);
    }

    async updateUserActivity({ id, isActive }: UpdateUserActivityRequest): Promise<UpdateUserActivityResponse> {
        const response = await this.instance.put(`admin/users/${id}/activity-status`, { isActive });
        return $UpdateUserActivityResponse.parse(response);
    }

    async updateUserStatic({ id, isStatic }: UpdateUserStaticRequest): Promise<UpdateUserStaticResponse> {
        const response = await this.instance.put(`admin/users/${id}/static-status`, { isStatic });
        return $UpdateUserStaticResponse.parse(response);
    }

    async showUser(id: string): Promise<UserDetailResponse> {
        const response = await this.instance.get(`admin/users/${id}`);
        return $UserDetailResponse.parse(response);
    }

    async createUser(data: CreateUserRequest): Promise<CreateUserResponse> {
        const response = await this.instance.post("admin/users", data);
        return $CreateUserResponse.parse(response);
    }

    async updateUser({ id, ...data }: UpdateAdminUserRequest): Promise<UpdateAdminUserResponse> {
        const response = await this.instance.put(`admin/users/${id}`, data);
        return $UpdateAdminUserResponse.parse(response);
    }

    async updateUserPassword({ id, ...data }: ChangeUserPasswordRequest): Promise<ChangeUserPasswordResponse> {
        const response = await this.instance.put(`admin/users/${id}/change-password`, data);
        return $ChangeUserPasswordResponse.parse(response);
    }

    //teachers
    async getStaticUsers(data: GetStaticUsersRequest): Promise<GetStaticUsersResponse> {
        const response = await this.instance.post("static-users/list", data);
        return $GetStaticUsersResponse.parse(response);
    }

    //students
    async getAdminStudents(params: GetAdminStudentsRequest): Promise<GetAdminStudentsResponse> {
        const response = await this.instance.post("admin/users/students/list", params);
        return $GetAdminStudentsResponse.parse(response);
    }
    async getAdminStudentsFilters(): Promise<GetAdminStudentsFiltersResponse> {
        const response = await this.instance.get("admin/users/students/filters");
        return $GetAdminStudentsFiltersResponse.parse(response);
    }
}

export const userApi = new UserApi(axios);
