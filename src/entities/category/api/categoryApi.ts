import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import {
    $GetAdminCategoriesResponse,
    GetAdminCategoriesResponse,
    GetAdminCategoriesRequest,
    CreateAdminCategoryRequest,
    UpdateAdminCategoryRequest,
    GetAdminSubCategoriesRequest,
    $GetAdminSubCategoriesResponse,
    GetAdminSubCategoriesResponse,
    GetCategoryResponse,
    $GetCategoryResponse,
    GetCategoryRequest,
    GetAdminCategoryRequest,
    GetAdminCategoryResponse,
    $GetAdminCategoryResponse,
    CreateAdminCategoryResponse,
    $CreateAdminCategoryResponse,
    UpdateAdminCategoryResponse,
    $UpdateAdminCategoryResponse,
    DeleteAdminCategoryRequest,
    DeleteAdminCategoryResponse,
    $DeleteAdminCategoryResponse,
    UpdateAdminCategoryActivityRequest,
    UpdateAdminCategoryActivityResponse,
    $UpdateAdminCategoryActivityResponse,
    GetAdminSubCategoriesPaginateResponse,
    $GetAdminSubCategoriesPaginateResponse,
} from "./types";

export class CategoryApi extends BaseApi {
    //ADMIN
    async getAdminCategories(data: GetAdminCategoriesRequest): Promise<GetAdminCategoriesResponse> {
        const response = await this.instance.post("admin/categories/list", data);
        return $GetAdminCategoriesResponse.parse(response);
    }

    async getAdminCategory({ id }: GetAdminCategoryRequest): Promise<GetAdminCategoryResponse> {
        const response = await this.instance.get(`admin/categories/${id}`);
        return $GetAdminCategoryResponse.parse(response);
    }

    async createAdminCategory(data: CreateAdminCategoryRequest): Promise<CreateAdminCategoryResponse> {
        const response = await this.instance.post(`admin/categories`, data);
        return $CreateAdminCategoryResponse.parse(response);
    }
    async updateAdminCategory({ id, ...data }: UpdateAdminCategoryRequest): Promise<UpdateAdminCategoryResponse> {
        const response = await this.instance.put(`admin/categories/${id}`, data);
        return $UpdateAdminCategoryResponse.parse(response);
    }

    async deleteAdminCategory({ id }: DeleteAdminCategoryRequest): Promise<DeleteAdminCategoryResponse> {
        const response = await this.instance.delete(`admin/categories/${id}`);
        return $DeleteAdminCategoryResponse.parse(response);
    }

    async updateAdminCategoryActivity({ id, isActive }: UpdateAdminCategoryActivityRequest): Promise<UpdateAdminCategoryActivityResponse> {
        const response = await this.instance.put(`admin/categories/${id}/activity-status`, { isActive });
        return $UpdateAdminCategoryActivityResponse.parse(response);
    }

    //subcategories
    async getAdminPaginateSubCategories(data: GetAdminSubCategoriesRequest): Promise<GetAdminSubCategoriesPaginateResponse> {
        const response = await this.instance.post("admin/subcategories/list", data);
        return $GetAdminSubCategoriesPaginateResponse.parse(response);
    }

    async getAdminSubCategories(data: GetAdminSubCategoriesRequest): Promise<GetAdminSubCategoriesResponse> {
        const response = await this.instance.post("admin/subcategories/list", data);
        return $GetAdminSubCategoriesResponse.parse(response);
    }

    //USER
    async getCategory({ id }: GetCategoryRequest): Promise<GetCategoryResponse> {
        const response = await this.instance.get(`categories/${id}`);
        return $GetCategoryResponse.parse(response);
    }
}

export const categoryApi = new CategoryApi(axios);
