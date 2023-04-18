import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import {
    $adminTag,
    $getAdminTagsResponse,
    AdminTag,
    CreateAdminTagRequest,
    GetAdminTagsRequest,
    GetAdminTagsResponse,
    UpdateAdminTagRequest,
} from "./types";

class TagApi extends BaseApi {
    async getAdminTags(params: GetAdminTagsRequest): Promise<GetAdminTagsResponse> {
        const response = await this.instance.get("admin/tags", { params });
        return $getAdminTagsResponse.parse(response);
    }

    async getAdminTag(id: string): Promise<AdminTag> {
        const response = await this.instance.get(`admin/tags/${id}`);
        return $adminTag.parse(response);
    }

    async createAdminTag(data: CreateAdminTagRequest): Promise<AdminTag> {
        const response = await this.instance.post(`admin/tags`, data);
        return $adminTag.parse(response);
    }
    async updateAdminTag(id: string, data: UpdateAdminTagRequest): Promise<AdminTag> {
        const response = await this.instance.put(`admin/tags/${id}`, data);
        return $adminTag.parse(response);
    }

    deleteTag(tagId: string): Promise<null> {
        return this.instance.delete(`admin/tags/${tagId}`);
    }
}

export const tagApi = new TagApi(axios);
