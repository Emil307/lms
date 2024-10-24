import { axios } from "@app/config/axios";
import { BaseApi, HTTPMethod } from "@shared/utils";
import {
    $AttachStudentsToGroupResponse,
    $CreateAdminGroupResponse,
    $DeleteAdminGroupResponse,
    $DeleteStudentsFromGroupResponse,
    $GetAdminGroupFiltersResponse,
    $GetAdminGroupResponse,
    $GetAdminGroupStudentsResponse,
    $GetAdminGroupsResponse,
    $GetAdminStudentGroupsResponse,
    $GetGroupModulesResponse,
    $GetGroupResponse,
    $GetGroupsCountsResponse,
    $GetGroupsRequest,
    $GetGroupsResponse,
    $UpdateAdminGroupResponse,
    $UpdateGroupActivityResponse,
    AttachStudentsToGroupRequest,
    AttachStudentsToGroupResponse,
    CreateAdminGroupRequest,
    CreateAdminGroupResponse,
    DeleteAdminGroupRequest,
    DeleteAdminGroupResponse,
    DeleteStudentsFromGroupRequest,
    DeleteStudentsFromGroupResponse,
    GetAdminGroupFiltersRequest,
    GetAdminGroupFiltersResponse,
    GetAdminGroupRequest,
    GetAdminGroupResponse,
    GetAdminGroupStudentsRequest,
    GetAdminGroupStudentsResponse,
    GetAdminGroupsRequest,
    GetAdminGroupsResponse,
    GetAdminStudentGroupsRequest,
    GetAdminStudentGroupsResponse,
    GetGroupModulesRequest,
    GetGroupModulesResponse,
    GetGroupRequest,
    GetGroupResponse,
    UpdateAdminGroupRequest,
    UpdateAdminGroupResponse,
    UpdateGroupActivityRequest,
    UpdateGroupActivityResponse,
    GetAdminGroupStudentStatisticsRequest,
    GetAdminGroupStudentStatisticsResponse,
    $GetAdminGroupStudentStatisticsResponse,
} from "./types";

export class GroupApi extends BaseApi {
    //ADMIN
    async getAdminGroups(data: GetAdminGroupsRequest): Promise<GetAdminGroupsResponse> {
        const response = await this.instance.post("courses/admin/groups/list", data);
        return $GetAdminGroupsResponse.parse(response);
    }
    async getAdminGroupFilters(params: GetAdminGroupFiltersRequest): Promise<GetAdminGroupFiltersResponse> {
        const response = await this.instance.get("courses/admin/groups/resources", { params });
        return $GetAdminGroupFiltersResponse.parse(response);
    }
    async getAdminGroup({ id }: GetAdminGroupRequest): Promise<GetAdminGroupResponse> {
        const response = await this.instance.get(`courses/admin/groups/${id}`);
        return $GetAdminGroupResponse.parse(response);
    }
    async createAdminGroup(data: CreateAdminGroupRequest): Promise<CreateAdminGroupResponse> {
        const response = await this.instance.post("courses/admin/groups", data);
        return $CreateAdminGroupResponse.parse(response);
    }
    async updateAdminGroup({ id, ...data }: UpdateAdminGroupRequest): Promise<UpdateAdminGroupResponse> {
        const response = await this.instance.put(`courses/admin/groups/${id}`, data);
        return $UpdateAdminGroupResponse.parse(response);
    }
    async deleteAdminGroup({ id }: DeleteAdminGroupRequest): Promise<DeleteAdminGroupResponse> {
        const response = await this.instance.delete(`courses/admin/groups/${id}`);
        return $DeleteAdminGroupResponse.parse(response);
    }
    async updateGroupActivity({ id, isActive }: UpdateGroupActivityRequest): Promise<UpdateGroupActivityResponse> {
        const response = await this.instance.put(`courses/admin/groups/${id}/activity-status`, { isActive });
        return $UpdateGroupActivityResponse.parse(response);
    }

    //students
    async getAdminGroupStudents({ groupId, ...data }: GetAdminGroupStudentsRequest): Promise<GetAdminGroupStudentsResponse> {
        const response = await this.instance.post(`courses/admin/groups/${groupId}/students/list`, data);
        return $GetAdminGroupStudentsResponse.parse(response);
    }
    async getAdminGroupStudentStatistics({
        groupId,
        studentId,
    }: GetAdminGroupStudentStatisticsRequest): Promise<GetAdminGroupStudentStatisticsResponse> {
        const response = await this.instance.get(`courses/admin/groups/${groupId}/students/${studentId}/statistics`);
        return $GetAdminGroupStudentStatisticsResponse.parse(response);
    }
    async attachStudentsToGroup({ groupId, ...data }: AttachStudentsToGroupRequest): Promise<AttachStudentsToGroupResponse> {
        const response = await this.instance.post(`courses/admin/groups/${groupId}/students`, data);
        return $AttachStudentsToGroupResponse.parse(response);
    }
    async deleteStudentsFromGroup({ groupId, ...data }: DeleteStudentsFromGroupRequest): Promise<DeleteStudentsFromGroupResponse> {
        const response = await this.instance.delete(`courses/admin/groups/${groupId}/students`, { data });
        return $DeleteStudentsFromGroupResponse.parse(response);
    }

    //students <-> group
    async getAdminStudentGroups({ studentId, ...data }: GetAdminStudentGroupsRequest): Promise<GetAdminStudentGroupsResponse> {
        const response = await this.instance.post(`courses/admin/users/${studentId}/groups/list`, data);
        return $GetAdminStudentGroupsResponse.parse(response);
    }

    //USER
    getGroups = this.createApiMethod({
        method: HTTPMethod.POST,
        path: `courses/groups/list`,
        requestSchema: $GetGroupsRequest,
        responseSchema: $GetGroupsResponse,
    });

    async getGroup({ id }: GetGroupRequest): Promise<GetGroupResponse> {
        const response = await this.instance.get(`courses/groups/${id}`);
        return $GetGroupResponse.parse(response);
    }

    getGroupsCounts = this.createApiMethod({
        method: HTTPMethod.GET,
        path: "courses/groups/counts",
        responseSchema: $GetGroupsCountsResponse,
    });

    async getGroupModules({ groupId, ...params }: GetGroupModulesRequest): Promise<GetGroupModulesResponse> {
        const response = await this.instance.get(`courses/groups/${groupId}/structure`, { params });
        return $GetGroupModulesResponse.parse(response);
    }
}

export const groupApi = new GroupApi(axios);
