import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import {
    $GetAdminCategoriesResponse,
    GetAdminCategoriesResponse,
    GetAdminCategoriesRequest,
    AdminCategory,
    $AdminCategory,
    CreateAdminCategoryRequest,
    UpdateAdminCategoryRequest,
    GetAdminSubCategoriesRequest,
    UpdateActivityStatusCategoryRequest,
    UpdateActivityStatusCategoryResponse,
    $UpdateActivityStatusCategoryResponse,
} from "./types";

class CategoryApi extends BaseApi {
    async getAdminCategories({ isActive, ...params }: GetAdminCategoriesRequest): Promise<GetAdminCategoriesResponse> {
        const response = await this.instance.post("admin/categories/list", {
            ...params,
            filter: {
                hasParent: "0",
                isActive,
            },
        });
        return $GetAdminCategoriesResponse.parse(response);
    }

    async getAdminSubCategories({ parentId, ...params }: GetAdminSubCategoriesRequest): Promise<GetAdminCategoriesResponse> {
        const response = await this.instance.get("admin/categories", {
            params: {
                ...params,
                filter: {
                    parentId,
                },
            },
        });
        return $GetAdminCategoriesResponse.parse(response);
    }

    async getAdminCategory(id?: string): Promise<AdminCategory> {
        const response = await this.instance.get(`admin/categories/${id}`);
        return $AdminCategory.parse(response);
    }

    async createAdminCategory(data: CreateAdminCategoryRequest): Promise<AdminCategory> {
        const response = await this.instance.post(`admin/categories`, data);
        return $AdminCategory.parse(response);
    }
    async updateAdminCategory({ id, ...data }: UpdateAdminCategoryRequest & { id: string }): Promise<AdminCategory> {
        const response = await this.instance.put(`admin/categories/${id}`, data);
        return $AdminCategory.parse(response);
    }

    async deleteCategory(id: string): Promise<void> {
        await this.instance.delete(`admin/categories/${id}`);
    }

    async updateActivityStatusCategory({
        id,
        isActive,
    }: UpdateActivityStatusCategoryRequest): Promise<UpdateActivityStatusCategoryResponse> {
        const response = await this.instance.put(`admin/users/${id}/activity-status`, { isActive });
        return $UpdateActivityStatusCategoryResponse.parse(response);
    }
}

export const categoryApi = new CategoryApi(axios);
