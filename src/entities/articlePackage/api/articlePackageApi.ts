import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import {
    GetAdminArticlePackagesResponse,
    $GetAdminArticlePackagesResponse,
    GetArticlePackagesResponse,
    $GetArticlePackagesResponse,
    $UpdateArticlePackageActivityResponse,
    UpdateArticlePackageActivityResponse,
    UpdateArticlePackageActivityRequest,
    GetAdminArticlePackageFiltersResponse,
    $GetAdminArticlePackageFiltersResponse,
    CreateArticlePackageResponse,
    GetAdminArticlePackageResponse,
    $GetAdminArticlePackageResponse,
    $CreateArticlePackageResponse,
    UpdateArticlePackageResponse,
    $UpdateArticlePackageResponse,
    GetAdminArticlePackageResourcesCreateResponse,
    $GetAdminArticlePackageResourcesCreateResponse,
    GetAdminArticlePackagesRequest,
    CreateArticlePackageRequest,
    UpdateArticlePackageRequest,
    DeleteArticleFromPackageRequest,
    AttachArticleToPackageRequest,
    GetArticlePackagesRequest,
} from "./types";

class ArticlePackageApi extends BaseApi {
    async getAdminArticlePackages(params: GetAdminArticlePackagesRequest): Promise<GetAdminArticlePackagesResponse> {
        const response = await this.instance.post("admin/article-packages/list", params);
        return $GetAdminArticlePackagesResponse.parse(response);
    }

    async getArticlePackages(data: GetArticlePackagesRequest): Promise<GetArticlePackagesResponse> {
        const response = await this.instance.post("article-packages/list", data);
        return $GetArticlePackagesResponse.parse(response);
    }

    async getAdminArticlePackageFilters(): Promise<GetAdminArticlePackageFiltersResponse> {
        const response = await this.instance.get("admin/article-packages/filters");
        return $GetAdminArticlePackageFiltersResponse.parse(response);
    }

    async getAdminArticlePackageResourcesCreate(): Promise<GetAdminArticlePackageResourcesCreateResponse> {
        const response = await this.instance.get("admin/article-packages/create");
        return $GetAdminArticlePackageResourcesCreateResponse.parse(response);
    }

    async getAdminArticlePackage(id?: string): Promise<GetAdminArticlePackageResponse> {
        const response = await this.instance.get(`admin/article-packages/${id}`);
        return $GetAdminArticlePackageResponse.parse(response);
    }

    async createArticlePackage(data: CreateArticlePackageRequest): Promise<CreateArticlePackageResponse> {
        const response = await this.instance.post("admin/article-packages", data);
        return $CreateArticlePackageResponse.parse(response);
    }
    async updateArticlePackage({ id, ...data }: UpdateArticlePackageRequest): Promise<UpdateArticlePackageResponse> {
        const response = await this.instance.put(`admin/article-packages/${id}`, data);
        return $UpdateArticlePackageResponse.parse(response);
    }

    async deleteArticlePackage(id: string): Promise<void> {
        await this.instance.delete(`admin/article-packages/${id}`);
    }

    async updateArticlePackageActivity({
        id,
        isActive,
    }: UpdateArticlePackageActivityRequest): Promise<UpdateArticlePackageActivityResponse> {
        const response = await this.instance.put(`admin/article-packages/${id}/activity-status`, { isActive });
        return $UpdateArticlePackageActivityResponse.parse(response);
    }

    //ARTICLES <--> ARTICLE_PACKAGE

    async attachArticleToArticlePackage({ articlePackageId, ...data }: AttachArticleToPackageRequest): Promise<void> {
        await this.instance.post(`admin/article-packages/${articlePackageId}/articles`, data);
    }

    async deleteArticleFromArticlePackage({ articleId, articlePackageId }: DeleteArticleFromPackageRequest): Promise<void> {
        await this.instance.delete(`admin/article-packages/${articlePackageId}/articles/${articleId}`);
    }
}

export const articlePackageApi = new ArticlePackageApi(axios);
