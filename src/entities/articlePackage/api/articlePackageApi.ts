import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import {
    $getAdminArticlePackagesResponse,
    GetAdminArticlePackagesResponse,
    GetAdminArticlePackagesRequestParams,
    GetAdminArticlePackagesResourceResponse,
    $getAdminArticlePackagesResourceResponse,
    AdminArticlePackageDetails,
    $adminArticlePackageDetails,
    CreateAdminArticlePackageRequest,
    UpdateAdminArticlePackageRequest,
    GetAdminArticlesFromArticlePackageRequestParams,
    $getAdminArticlesFromArticlePackageResponse,
    GetAdminArticlesFromArticlePackageResponse,
    DeleteAdminArticleFromPackageRequest,
} from "./types";

class ArticlePackageApi extends BaseApi {
    async getAdminArticlePackages({
        isActive,
        categoryId,
        createdAt,
        ...params
    }: GetAdminArticlePackagesRequestParams): Promise<GetAdminArticlePackagesResponse> {
        const response = await this.instance.post("admin/article-packages/list", {
            params: {
                ...params,
                filter: {
                    isActive,
                    categoryId,
                    createdAt,
                },
            },
        });
        return $getAdminArticlePackagesResponse.parse(response);
    }
    async getAdminArticlePackageResource(): Promise<GetAdminArticlePackagesResourceResponse> {
        const response = await this.instance.get("admin/article-packages/resource");
        return $getAdminArticlePackagesResourceResponse.parse(response);
    }

    async getAdminArticlePackage(id?: string): Promise<AdminArticlePackageDetails> {
        const response = await this.instance.get(`admin/article-packages/${id}`);
        return $adminArticlePackageDetails.parse(response);
    }

    async createAdminArticlePackage(data: CreateAdminArticlePackageRequest): Promise<AdminArticlePackageDetails> {
        const response = await this.instance.post("admin/article-packages", data);
        return $adminArticlePackageDetails.parse(response);
    }
    async updateAdminArticlePackage({
        id,
        ...data
    }: UpdateAdminArticlePackageRequest & { id: string }): Promise<AdminArticlePackageDetails> {
        const response = await this.instance.put(`admin/article-packages/${id}`, data);
        return $adminArticlePackageDetails.parse(response);
    }

    async deleteArticlePackage(id: string): Promise<void> {
        await this.instance.delete(`admin/article-packages/${id}`);
    }

    //ARTICLES FROM ARTICLE_PACKAGE
    async getAdminArticleFromArticlePackage({
        articlePackageId,
        ...params
    }: GetAdminArticlesFromArticlePackageRequestParams): Promise<GetAdminArticlesFromArticlePackageResponse> {
        const response = await this.instance.post(`admin/article-packages/${articlePackageId}/articles/list`, {
            params,
        });
        return $getAdminArticlesFromArticlePackageResponse.parse(response);
    }

    async deleteArticleFromArticlePackage({ articleId, articlePackageId }: DeleteAdminArticleFromPackageRequest): Promise<void> {
        await this.instance.delete(`admin/article-packages/${articlePackageId}/articles/${articleId}`);
    }
}

export const articlePackageApi = new ArticlePackageApi(axios);
