import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import {
    GetAdminArticlePackagesResponse,
    GetAdminArticlePackagesRequestParams,
    GetAdminArticlePackagesResourceResponse,
    AdminArticlePackageDetails,
    CreateAdminArticlePackageRequest,
    UpdateAdminArticlePackageRequest,
    GetAdminArticlesFromArticlePackageRequestParams,
    GetAdminArticlesFromArticlePackageResponse,
    DeleteAdminArticleFromPackageRequest,
    UpdateActivityStatusArticlePackageRequest,
    UpdateActivityStatusArticlePackageResponse,
    $UpdateActivityStatusArticlePackageResponse,
    $GetAdminArticlePackagesResponse,
    $GetAdminArticlePackagesResourceResponse,
    $AdminArticlePackageDetails,
    $GetAdminArticlesFromArticlePackageResponse,
    GetArticlePackagesResponse,
    $GetArticlePackagesResponse,
    GetArticlesFromArticlePackage,
    $GetArticlesFromArticlePackage,
    GetArticlesFromArticlePackageRequest,
} from "./types";

class ArticlePackageApi extends BaseApi {
    async getAdminArticlePackages({
        isActive,
        categoryId,
        createdAt,
        ...params
    }: GetAdminArticlePackagesRequestParams): Promise<GetAdminArticlePackagesResponse> {
        const response = await this.instance.post("admin/article-packages/list", {
            ...params,
            filter: {
                isActive,
                categoryId,
                createdAt,
            },
        });
        return $GetAdminArticlePackagesResponse.parse(response);
    }

    async getArticlePackages(page: number): Promise<GetArticlePackagesResponse> {
        const response = await this.instance.post("article-packages/list", {
            page,
        });
        return $GetArticlePackagesResponse.parse(response);
    }

    async getAdminArticlePackageResource(): Promise<GetAdminArticlePackagesResourceResponse> {
        const response = await this.instance.get("admin/article-packages/resource");
        return $GetAdminArticlePackagesResourceResponse.parse(response);
    }

    async getAdminArticlePackage(id?: string): Promise<AdminArticlePackageDetails> {
        const response = await this.instance.get(`admin/article-packages/${id}`);
        return $AdminArticlePackageDetails.parse(response);
    }

    async createAdminArticlePackage(data: CreateAdminArticlePackageRequest): Promise<AdminArticlePackageDetails> {
        const response = await this.instance.post("admin/article-packages", data);
        return $AdminArticlePackageDetails.parse(response);
    }
    async updateAdminArticlePackage({
        id,
        ...data
    }: UpdateAdminArticlePackageRequest & { id: string }): Promise<AdminArticlePackageDetails> {
        const response = await this.instance.put(`admin/article-packages/${id}`, data);
        return $AdminArticlePackageDetails.parse(response);
    }

    async deleteArticlePackage(id: string): Promise<void> {
        await this.instance.delete(`admin/article-packages/${id}`);
    }

    async updateActivityStatusArticlePackage({
        id,
        isActive,
    }: UpdateActivityStatusArticlePackageRequest): Promise<UpdateActivityStatusArticlePackageResponse> {
        const response = await this.instance.put(`admin/article-packages/${id}/activity-status`, { isActive });
        return $UpdateActivityStatusArticlePackageResponse.parse(response);
    }

    //ARTICLES FROM ARTICLE_PACKAGE
    async getAdminArticlesFromArticlePackage({
        articlePackageId,
        ...params
    }: GetAdminArticlesFromArticlePackageRequestParams): Promise<GetAdminArticlesFromArticlePackageResponse> {
        const response = await this.instance.post(`admin/article-packages/${articlePackageId}/articles/list`, {
            params,
        });
        return $GetAdminArticlesFromArticlePackageResponse.parse(response);
    }

    async getArticlesFromArticlePackage({
        articlePackageId,
        categoryId,
        ...params
    }: GetArticlesFromArticlePackageRequest): Promise<GetArticlesFromArticlePackage> {
        const response = await this.instance.post(`article-packages/${articlePackageId}/articles/list`, {
            ...params,
            filter: {
                "category.id": categoryId,
                //TODO: Убрать как беки по умолчанию будут подставлять эти 2 поля
                articlePackageIds: articlePackageId,
            },
        });
        return $GetArticlesFromArticlePackage.parse(response);
    }

    async deleteArticleFromArticlePackage({ articleId, articlePackageId }: DeleteAdminArticleFromPackageRequest): Promise<void> {
        await this.instance.delete(`admin/article-packages/${articlePackageId}/articles/${articleId}`);
    }
}

export const articlePackageApi = new ArticlePackageApi(axios);
