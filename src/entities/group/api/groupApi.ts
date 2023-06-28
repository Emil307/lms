import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import {
    $AttachParticipantsToGroupResponse,
    $CreateAdminGroupResponse,
    $DeleteAdminGroupResponse,
    $DeleteParticipantsFromGroupResponse,
    $GetAdminGroupFiltersResponse,
    $GetAdminGroupParticipantsResponse,
    $GetAdminGroupResponse,
    $GetAdminGroupsResponse,
    $GetGroupSchedulesResponse,
    $UpdateAdminGroupResponse,
    $UpdateGroupActivityResponse,
    AddScheduleToGroupRequest,
    AttachParticipantsToGroupRequest,
    AttachParticipantsToGroupResponse,
    CreateAdminGroupRequest,
    CreateAdminGroupResponse,
    DeleteAdminGroupRequest,
    DeleteAdminGroupResponse,
    DeleteParticipantsFromGroupRequest,
    DeleteParticipantsFromGroupResponse,
    GetAdminGroupFiltersRequest,
    GetAdminGroupFiltersResponse,
    GetAdminGroupParticipantsRequest,
    GetAdminGroupParticipantsResponse,
    GetAdminGroupRequest,
    GetAdminGroupResponse,
    GetAdminGroupsRequest,
    GetAdminGroupsResponse,
    GetGroupSchedulesRequest,
    GetGroupSchedulesResponse,
    RemoveScheduleFromGroupRequest,
    UpdateAdminGroupRequest,
    UpdateAdminGroupResponse,
    UpdateGroupActivityRequest,
    UpdateGroupActivityResponse,
    UpdateScheduleFromGroupRequest,
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

    // schedules
    async getGroupSchedules({ groupId, ...params }: GetGroupSchedulesRequest): Promise<GetGroupSchedulesResponse> {
        const response = await this.instance.post(`admin/groups/${groupId}/schedules/list`, params);
        return $GetGroupSchedulesResponse.parse(response);
    }
    addScheduleToGroup({ groupId, ...data }: AddScheduleToGroupRequest & { groupId?: string }): Promise<void> {
        return this.instance.post(`admin/groups/${groupId}/add-schedule`, data);
    }
    removeScheduleFromGroup({ groupId, ...data }: RemoveScheduleFromGroupRequest): Promise<void> {
        return this.instance.delete(`admin/groups/${groupId}/remove-schedule`, { data });
    }
    updateScheduleFromGroup({ groupId, ...data }: UpdateScheduleFromGroupRequest & { groupId?: string }): Promise<void> {
        return this.instance.put(`admin/groups/${groupId}/update-schedule`, data);
    }
}

export const groupApi = new GroupApi(axios);
