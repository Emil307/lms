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
    GetAdminSubCategoriesRequest,
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
        return $getAdminCategoriesResponse.parse(response);
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
