import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import {
    $CreateAuthorResponse,
    $DeleteAuthorResponse,
    $GetAdminAuthorResponse,
    $GetAdminAuthorsResponse,
    $UpdateAuthorActivityResponse,
    $UpdateAuthorResponse,
    CreateAuthorRequest,
    CreateAuthorResponse,
    DeleteAuthorRequest,
    DeleteAuthorResponse,
    GetAdminAuthorRequest,
    GetAdminAuthorResponse,
    GetAdminAuthorsRequest,
    GetAdminAuthorsResponse,
    UpdateAuthorActivityRequest,
    UpdateAuthorActivityResponse,
    UpdateAuthorRequest,
    UpdateAuthorResponse,
} from "./types";

export class AuthorApi extends BaseApi {
    async getAdminAuthors(params: GetAdminAuthorsRequest): Promise<GetAdminAuthorsResponse> {
        const response = await this.instance.post("courses/admin/authors/list", params);
        return $GetAdminAuthorsResponse.parse(response);
    }

    async getAdminAuthor({ id }: GetAdminAuthorRequest): Promise<GetAdminAuthorResponse> {
        const response = await this.instance.get(`courses/admin/authors/${id}`);
        return $GetAdminAuthorResponse.parse(response);
    }

    async createAuthor(data: CreateAuthorRequest): Promise<CreateAuthorResponse> {
        const response = await this.instance.post("courses/admin/authors", data);
        return $CreateAuthorResponse.parse(response);
    }
    async updateAuthor({ id, ...data }: UpdateAuthorRequest): Promise<UpdateAuthorResponse> {
        const response = await this.instance.put(`courses/admin/authors/${id}`, data);
        return $UpdateAuthorResponse.parse(response);
    }

    async deleteAuthor({ id }: DeleteAuthorRequest): Promise<DeleteAuthorResponse> {
        const response = await this.instance.delete(`courses/admin/authors/${id}`);
        return $DeleteAuthorResponse.parse(response);
    }

    async updateAuthorActivity({ id, ...data }: UpdateAuthorActivityRequest): Promise<UpdateAuthorActivityResponse> {
        const response = await this.instance.put(`courses/admin/authors/${id}/activity-status`, data);
        return $UpdateAuthorActivityResponse.parse(response);
    }
}

export const authorApi = new AuthorApi(axios);
