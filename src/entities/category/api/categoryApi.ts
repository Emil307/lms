import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import {
    $getAdminCategoriesResponse,
    GetAdminCategoriesResponse,
    GetAdminCategoriesRequest,
    AdminCategory,
    $adminCategory,
    CreateAdminCategoryRequest,
    UpdateAdminCategoryRequest,
} from "./types";

class CategoryApi extends BaseApi {
    async getAdminCategories(params: GetAdminCategoriesRequest): Promise<GetAdminCategoriesResponse> {
        const response = await this.instance.get("admin/categories", {
            params: {
                ...params,
                sort: params.sorting?.[0] ? { [params.sorting[0].id]: params.sorting[0].desc ? "desc" : "asc" } : null,
            },
        });

        return $getAdminCategoriesResponse.parse(response);
    }

    async getAdminCategory(id?: string): Promise<AdminCategory> {
        const response = await this.instance.get(`admin/categories/${id}`);
        return $adminCategory.parse(response);
    }

    async createAdminCategory(data: CreateAdminCategoryRequest): Promise<AdminCategory> {
        const response = await this.instance.post(`admin/categories`, data);
        return $adminCategory.parse(response);
    }
    async updateAdminCategory({ id, ...data }: UpdateAdminCategoryRequest & { id: string }): Promise<AdminCategory> {
        const response = await this.instance.put(`admin/categories/${id}`, data);
        return $adminCategory.parse(response);
    }

    async deleteCategory(id: string): Promise<void> {
        await this.instance.delete(`admin/categories/${id}`);
    }

    async activateCategory(id: string): Promise<void> {
        await axios.put(`admin/categories/${id}/activate`);
    }

    async deactivateCategory(id: string): Promise<void> {
        await axios.put(`admin/categories/${id}/deactivate`);
    }
}

export const categoryApi = new CategoryApi(axios);
