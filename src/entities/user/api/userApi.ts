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
    AttachCoursesToStudentRequest,
    AttachCoursesToStudentResponse,
    $AttachCoursesToStudentResponse,
    DeleteStudentCoursesRequest,
    DeleteStudentCoursesResponse,
    $DeleteStudentCoursesResponse,
} from "./types";

export class UserApi extends BaseApi {
    async getAdminUsers({ roleName, isActive, ...params }: UsersRequestParamsType): Promise<GetUsersResponse> {
        const result = await this.instance.post("admin/users/administrators/list", {
            ...params,
            filter: {
                roleName,
                isActive,
            },
        });
        return $GetUsersResponse.parse(result);
    }

    async getAdminUsersFilters(): Promise<GetUsersAdminFiltersResponse> {
        const result = await this.instance.get("admin/users/administrators/filters");
        return $GetUsersAdminFiltersResponse.parse(result);
    }

    async deleteUser(id: string): Promise<void> {
        await this.instance.delete(`admin/users/${id}`);
    }

    async updateUserActivity({ id, isActive }: UpdateUserActivityRequest): Promise<UpdateUserActivityResponse> {
        const response = await this.instance.put(`admin/users/${id}/activity-status`, { isActive });
        return $UpdateUserActivityResponse.parse(response);
    }
    async showUser(id: string): Promise<UserDetailResponse> {
        const result = await this.instance.get(`admin/users/${id}`);
        return $UserDetailResponse.parse(result);
    }

    async createUser(data: CreateUserRequest): Promise<CreateUserResponse> {
        const result = await this.instance.post("admin/users", data);
        return $CreateUserResponse.parse(result);
    }

    async updateUser({ id, ...data }: UpdateAdminUserRequest): Promise<UpdateAdminUserResponse> {
        const result = await this.instance.put(`admin/users/${id}`, data);
        return $UpdateAdminUserResponse.parse(result);
    }

    async updateUserPassword({ id, ...data }: ChangeUserPasswordRequest): Promise<void> {
        await this.instance.put(`admin/users/${id}/change-password`, data);
    }

    //teachers
    async getStaticUsers(data: GetStaticUsersRequest): Promise<GetStaticUsersResponse> {
        const response = await this.instance.post("static-users/list", data);
        return $GetStaticUsersResponse.parse(response);
    }

    //students
    async getAdminStudents(params: GetAdminStudentsRequest): Promise<GetAdminStudentsResponse> {
        const result = await this.instance.post("admin/users/students/list", params);
        return $GetAdminStudentsResponse.parse(result);
    }
    async getAdminStudentsFilters(): Promise<GetAdminStudentsFiltersResponse> {
        const result = await this.instance.get("admin/users/students/filters");
        return $GetAdminStudentsFiltersResponse.parse(result);
    }

    //students <---> COURSES ADMIN
    async attachCoursesToStudent({ studentId, ...data }: AttachCoursesToStudentRequest): Promise<AttachCoursesToStudentResponse> {
        const response = await this.instance.post(`admin/users/${studentId}/courses`, data);
        return $AttachCoursesToStudentResponse.parse(response);
    }

    async deleteStudentCourses({ studentId, ...params }: DeleteStudentCoursesRequest): Promise<DeleteStudentCoursesResponse> {
        const response = await this.instance.delete(`admin/users/${studentId}/courses`, { params });
        return $DeleteStudentCoursesResponse.parse(response);
    }
}

export const userApi = new UserApi(axios);
