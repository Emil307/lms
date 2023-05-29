import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import {
    $Author,
    $GetAuthorsResponse,
    Author,
    CreateAuthorRequest,
    GetAuthorsRequestParams,
    GetAuthorsResponse,
    UpdateAuthorActivityRequest,
    UpdateAuthorRequest,
} from "./types";

class AuthorApi extends BaseApi {
    async getAuthors({ isActive, ...params }: GetAuthorsRequestParams): Promise<GetAuthorsResponse> {
        const response = await this.instance.post("authors/list", {
            ...params,
            filter: {
                isActive,
            },
        });

        return $GetAuthorsResponse.parse(response);
    }

    async getAuthor(id: string): Promise<Author> {
        const response = await this.instance.get(`authors/${id}`);
        return $Author.parse(response);
    }

    async createAuthor(data: CreateAuthorRequest): Promise<Author> {
        const response = await this.instance.post("authors", data);
        return $Author.parse(response);
    }
    async updateAuthor(id: string, data: UpdateAuthorRequest): Promise<Author> {
        const response = await this.instance.put(`authors/${id}`, data);
        return $Author.parse(response);
    }

    async deleteAuthor(id: string): Promise<void> {
        await this.instance.delete(`authors/${id}`);
    }

    //TODO: Поправить как обновят беки что при обвлении всегда возвращается модель
    async updateAuthorActivity({ id, ...data }: UpdateAuthorActivityRequest): Promise<{ status: boolean }> {
        await this.instance.put(`authors/${id}/activity-status`, data);
        return data;
    }
}

export const authorApi = new AuthorApi(axios);
