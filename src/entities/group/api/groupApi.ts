import { axios } from "@app/config/axios";
import { BaseApi, HTTPMethod } from "@shared/utils";
import {
    $AttachParticipantsToGroupResponse,
    $CreateAdminGroupResponse,
    $CreateAdminGroupScheduleResponse,
    $DeleteAdminGroupResponse,
    $DeleteAdminGroupScheduleResponse,
    $DeleteParticipantsFromGroupResponse,
    $GetAdminGroupFiltersResponse,
    $GetAdminGroupParticipantsResponse,
    $GetAdminGroupResponse,
    $GetAdminGroupSchedulesResponse,
    $GetAdminGroupsResponse,
    $GetGroupModulesResponse,
    $GetGroupResponse,
    $GetGroupsCountsResponse,
    $GetGroupsRequest,
    $GetGroupsResponse,
    $UpdateAdminGroupResponse,
    $UpdateAdminGroupScheduleResponse,
    $UpdateGroupActivityResponse,
    AttachParticipantsToGroupRequest,
    AttachParticipantsToGroupResponse,
    CreateAdminGroupRequest,
    CreateAdminGroupResponse,
    CreateAdminGroupScheduleRequest,
    CreateAdminGroupScheduleResponse,
    DeleteAdminGroupRequest,
    DeleteAdminGroupResponse,
    DeleteAdminGroupScheduleRequest,
    DeleteAdminGroupScheduleResponse,
    DeleteParticipantsFromGroupRequest,
    DeleteParticipantsFromGroupResponse,
    GetAdminGroupFiltersRequest,
    GetAdminGroupFiltersResponse,
    GetAdminGroupParticipantsRequest,
    GetAdminGroupParticipantsResponse,
    GetAdminGroupRequest,
    GetAdminGroupResponse,
    GetAdminGroupSchedulesRequest,
    GetAdminGroupSchedulesResponse,
    GetAdminGroupsRequest,
    GetAdminGroupsResponse,
    GetGroupModulesRequest,
    GetGroupModulesResponse,
    GetGroupRequest,
    GetGroupResponse,
    UpdateAdminGroupRequest,
    UpdateAdminGroupResponse,
    UpdateAdminGroupScheduleRequest,
    UpdateAdminGroupScheduleResponse,
    UpdateGroupActivityRequest,
    UpdateGroupActivityResponse,
} from "./types";

class GroupApi extends BaseApi {
    //ADMIN
    async getAdminGroups(data: GetAdminGroupsRequest): Promise<GetAdminGroupsResponse> {
        const response = await this.instance.post("admin/groups/list", data);
        return $GetAdminGroupsResponse.parse(response);
    }
    async getAdminGroupFilters(params: GetAdminGroupFiltersRequest): Promise<GetAdminGroupFiltersResponse> {
        const response = await this.instance.get("admin/groups/resources", { params });
        return $GetAdminGroupFiltersResponse.parse(response);
    }
    async getAdminGroup({ id }: GetAdminGroupRequest): Promise<GetAdminGroupResponse> {
        const response = await this.instance.get(`admin/groups/${id}`);
        return $GetAdminGroupResponse.parse(response);
    }
    async createAdminGroup(data: CreateAdminGroupRequest): Promise<CreateAdminGroupResponse> {
        const response = await this.instance.post("admin/groups", data);
        return $CreateAdminGroupResponse.parse(response);
    }
    async updateAdminGroup({ id, ...data }: UpdateAdminGroupRequest): Promise<UpdateAdminGroupResponse> {
        const response = await this.instance.put(`admin/groups/${id}`, data);
        return $UpdateAdminGroupResponse.parse(response);
    }
    async deleteAdminGroup({ id }: DeleteAdminGroupRequest): Promise<DeleteAdminGroupResponse> {
        const response = await this.instance.delete(`admin/groups/${id}`);
        return $DeleteAdminGroupResponse.parse(response);
    }
    async updateGroupActivity({ id, isActive }: UpdateGroupActivityRequest): Promise<UpdateGroupActivityResponse> {
        const response = await this.instance.put(`admin/groups/${id}/activity-status`, { isActive });
        return $UpdateGroupActivityResponse.parse(response);
    }

    //participants (students)
    async getAdminGroupParticipants({ groupId, ...data }: GetAdminGroupParticipantsRequest): Promise<GetAdminGroupParticipantsResponse> {
        const response = await this.instance.post(`admin/groups/${groupId}/students/list`, data);
        return $GetAdminGroupParticipantsResponse.parse(response);
    }
    async attachParticipantsToGroup({ groupId, ...data }: AttachParticipantsToGroupRequest): Promise<AttachParticipantsToGroupResponse> {
        const response = await this.instance.post(`admin/groups/${groupId}/students`, data);
        return $AttachParticipantsToGroupResponse.parse(response);
    }
    async deleteParticipantsFromGroup({
        groupId,
        ...data
    }: DeleteParticipantsFromGroupRequest): Promise<DeleteParticipantsFromGroupResponse> {
        const response = await this.instance.delete(`admin/groups/${groupId}/students`, { data });
        return $DeleteParticipantsFromGroupResponse.parse(response);
    }

    //schedules
    async getAdminGroupSchedules({ groupId, ...params }: GetAdminGroupSchedulesRequest): Promise<GetAdminGroupSchedulesResponse> {
        const response = await this.instance.post(`admin/groups/${groupId}/schedules/list`, params);
        return $GetAdminGroupSchedulesResponse.parse(response);
    }
    async createAdminGroupSchedule({ groupId, ...data }: CreateAdminGroupScheduleRequest): Promise<CreateAdminGroupScheduleResponse> {
        const response = await this.instance.post(`admin/groups/${groupId}/schedules`, data);
        return $CreateAdminGroupScheduleResponse.parse(response);
    }
    async updateAdminGroupSchedule({
        groupId,
        scheduleId,
        ...data
    }: UpdateAdminGroupScheduleRequest): Promise<UpdateAdminGroupScheduleResponse> {
        const response = await this.instance.put(`admin/groups/${groupId}/schedules/${scheduleId}`, data);
        return $UpdateAdminGroupScheduleResponse.parse(response);
    }
    async deleteAdminGroupSchedule({ groupId, scheduleId }: DeleteAdminGroupScheduleRequest): Promise<DeleteAdminGroupScheduleResponse> {
        const response = await this.instance.delete(`admin/groups/${groupId}/schedules/${scheduleId}`);
        return $DeleteAdminGroupScheduleResponse.parse(response);
    }

    //USER
    getGroups = this.createApiMethod({
        method: HTTPMethod.POST,
        path: `groups/list`,
        requestSchema: $GetGroupsRequest,
        responseSchema: $GetGroupsResponse,
    });

    async getGroup({ id }: GetGroupRequest): Promise<GetGroupResponse> {
        const response = await this.instance.get(`groups/${id}`);
        return $GetGroupResponse.parse(response);
    }

    getGroupsCounts = this.createApiMethod({
        method: HTTPMethod.GET,
        path: "groups/counts",
        responseSchema: $GetGroupsCountsResponse,
    });

    async getGroupModules({ groupId, ...params }: GetGroupModulesRequest): Promise<GetGroupModulesResponse> {
        const response = await this.instance.get(`groups/${groupId}/structure`, { params });
        return $GetGroupModulesResponse.parse(response);
    }
}

export const groupApi = new GroupApi(axios);
