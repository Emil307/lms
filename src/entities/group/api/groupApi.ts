import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import {
    $getAdminGroupResponse,
    $getAdminGroupsResponse,
    $getGroupSchedulesResponse,
    AddScheduleToGroupRequest,
    CreateGroupRequest,
    GetAdminGroupResponse,
    GetAdminGroupsRequest,
    GetAdminGroupsResponse,
    GetGroupSchedulesRequest,
    GetGroupSchedulesResponse,
    RemoveScheduleFromGroupRequest,
    UpdateGroupRequest,
    UpdateScheduleFromGroupRequest,
} from "./types";

class GroupApi extends BaseApi {
    async getAdminGroups({ isActive, ...params }: GetAdminGroupsRequest): Promise<GetAdminGroupsResponse> {
        const response = await this.instance.get("admin/groups", {
            params: {
                ...params,
                filter: { isActive },
            },
        });
        return $getAdminGroupsResponse.parse(response);
    }
    async getAdminGroup(courseId: string): Promise<GetAdminGroupResponse> {
        const response = await this.instance.get(`admin/groups/${courseId}`);
        return $getAdminGroupResponse.parse(response);
    }
    async createGroup(data: CreateGroupRequest): Promise<GetAdminGroupResponse> {
        const response = await this.instance.post("admin/groups", data);
        return $getAdminGroupResponse.parse(response);
    }
    async updateGroup({ id, ...data }: UpdateGroupRequest): Promise<GetAdminGroupResponse> {
        const response = await this.instance.put(`admin/groups/${id}`, data);
        return $getAdminGroupResponse.parse(response);
    }
    activateGroup(courseId: string): Promise<null> {
        return this.instance.put(`admin/groups/${courseId}/activate`);
    }
    deactivateGroup(courseId: string): Promise<null> {
        return this.instance.put(`admin/groups/${courseId}/deactivate`);
    }
    deleteGroup(courseId: string): Promise<null> {
        return this.instance.delete(`admin/groups/${courseId}`);
    }

    // schedules
    async getGroupSchedules({ groupId, ...params }: GetGroupSchedulesRequest): Promise<GetGroupSchedulesResponse> {
        const response = await this.instance.get(`admin/groups/${groupId}/schedules`, { params });
        return $getGroupSchedulesResponse.parse(response);
    }
    addScheduleToGroup({ groupId, ...data }: AddScheduleToGroupRequest & { groupId?: string }): Promise<void> {
        return this.instance.post(`admin/groups/${groupId}/add-schedule`, data);
    }
    removeScheduleFromGroup({ groupId, ...data }: RemoveScheduleFromGroupRequest & { groupId?: string }): Promise<void> {
        return this.instance.delete(`admin/groups/${groupId}/remove-schedule`, { data });
    }
    updateScheduleFromGroup({ groupId, ...data }: UpdateScheduleFromGroupRequest & { groupId?: string }): Promise<void> {
        return this.instance.put(`admin/groups/${groupId}/update-schedule`, data);
    }
}

export const groupApi = new GroupApi(axios);
