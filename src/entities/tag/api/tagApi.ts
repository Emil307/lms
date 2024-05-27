import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import {
    $CreateAdminTagResponse,
    $DeleteAdminTagResponse,
    $GetAdminTagResponse,
    $GetAdminTagsResponse,
    $UpdateAdminTagResponse,
    CreateAdminTagRequest,
    CreateAdminTagResponse,
    DeleteAdminTagRequest,
    DeleteAdminTagResponse,
    GetAdminTagRequest,
    GetAdminTagResponse,
    GetAdminTagsRequest,
    GetAdminTagsResponse,
    UpdateAdminTagRequest,
    UpdateAdminTagResponse,
} from "./types";

class TagApi extends BaseApi {
    //ADMIN
    async getAdminTags(data: GetAdminTagsRequest): Promise<GetAdminTagsResponse> {
        const response = await this.instance.post("core/admin/tags/list", data);
        return $GetAdminTagsResponse.parse(response);
    }

    async getAdminTag({ id }: GetAdminTagRequest): Promise<GetAdminTagResponse> {
        const response = await this.instance.get(`core/admin/tags/${id}`);
        return $GetAdminTagResponse.parse(response);
    }

    async createAdminTag(data: CreateAdminTagRequest): Promise<CreateAdminTagResponse> {
        const response = await this.instance.post(`core/admin/tags`, data);
        return $CreateAdminTagResponse.parse(response);
    }

    async updateAdminTag({ id, ...data }: UpdateAdminTagRequest): Promise<UpdateAdminTagResponse> {
        const response = await this.instance.put(`core/admin/tags/${id}`, data);
        return $UpdateAdminTagResponse.parse(response);
    }

    async deleteAdminTag({ id }: DeleteAdminTagRequest): Promise<DeleteAdminTagResponse> {
        const response = await this.instance.delete(`core/admin/tags/${id}`);
        return $DeleteAdminTagResponse.parse(response);
    }

    //USER
}

export const tagApi = new TagApi(axios);
