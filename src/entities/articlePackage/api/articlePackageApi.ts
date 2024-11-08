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
    GetAdminStudentArticlePackagesRequest,
    GetAdminStudentArticlePackagesResponse,
    $GetAdminStudentArticlePackagesResponse,
    AttachArticlePackagesToStudentRequest,
    AttachArticlePackagesToStudentResponse,
    $AttachArticlePackagesToStudentResponse,
    DeleteStudentArticlePackageRequest,
    DeleteStudentArticlePackageResponse,
    $DeleteStudentArticlePackageResponse,
} from "./types";

export class ArticlePackageApi extends BaseApi {
    //ADMIN
    async getAdminArticlePackages(params: GetAdminArticlePackagesRequest): Promise<GetAdminArticlePackagesResponse> {
        const response = await this.instance.post("articles/admin/article-packages/list", params);
        return $GetAdminArticlePackagesResponse.parse(response);
    }

    async getAdminArticlePackageFilters(): Promise<GetAdminArticlePackageFiltersResponse> {
        const response = await this.instance.get("articles/admin/article-packages/filters");
        return $GetAdminArticlePackageFiltersResponse.parse(response);
    }

    async getAdminArticlePackageResourcesCreate(): Promise<GetAdminArticlePackageResourcesCreateResponse> {
        const response = await this.instance.get("articles/admin/article-packages/create");
        return $GetAdminArticlePackageResourcesCreateResponse.parse(response);
    }

    async getAdminArticlePackage(id?: string): Promise<GetAdminArticlePackageResponse> {
        const response = await this.instance.get(`articles/admin/article-packages/${id}`);
        return $GetAdminArticlePackageResponse.parse(response);
    }

    async createArticlePackage(data: CreateArticlePackageRequest): Promise<CreateArticlePackageResponse> {
        const response = await this.instance.post("articles/admin/article-packages", data);
        return $CreateArticlePackageResponse.parse(response);
    }
    async updateArticlePackage({ id, ...data }: UpdateArticlePackageRequest): Promise<UpdateArticlePackageResponse> {
        const response = await this.instance.put(`articles/admin/article-packages/${id}`, data);
        return $UpdateArticlePackageResponse.parse(response);
    }

    async deleteArticlePackage(id: string): Promise<void> {
        await this.instance.delete(`articles/admin/article-packages/${id}`);
    }

    async updateArticlePackageActivity({
        id,
        isActive,
    }: UpdateArticlePackageActivityRequest): Promise<UpdateArticlePackageActivityResponse> {
        const response = await this.instance.put(`articles/admin/article-packages/${id}/activity-status`, { isActive });
        return $UpdateArticlePackageActivityResponse.parse(response);
    }

    //students <-> articlePackage ADMIN
    async getAdminStudentArticlePackages({
        studentId,
        ...data
    }: GetAdminStudentArticlePackagesRequest): Promise<GetAdminStudentArticlePackagesResponse> {
        const response = await this.instance.post(`articles/admin/users/${studentId}/article-packages/list`, data);
        return $GetAdminStudentArticlePackagesResponse.parse(response);
    }

    async attachArticlePackagesToStudent({
        studentId,
        ...data
    }: AttachArticlePackagesToStudentRequest): Promise<AttachArticlePackagesToStudentResponse> {
        const response = await this.instance.post(`articles/admin/users/${studentId}/article-packages`, data);
        return $AttachArticlePackagesToStudentResponse.parse(response);
    }

    async deleteStudentArticlePackage({
        studentId,
        articlePackageId,
    }: DeleteStudentArticlePackageRequest): Promise<DeleteStudentArticlePackageResponse> {
        const response = await this.instance.delete(`articles/admin/users/${studentId}/article-packages/${articlePackageId}`);
        return $DeleteStudentArticlePackageResponse.parse(response);
    }

    //ARTICLES <--> ARTICLE_PACKAGE ADMIN
    async attachArticleToArticlePackage({ articlePackageId, ...data }: AttachArticleToPackageRequest): Promise<void> {
        await this.instance.post(`articles/admin/article-packages/${articlePackageId}/articles`, data);
    }

    async deleteArticleFromArticlePackage({ articleId, articlePackageId }: DeleteArticleFromPackageRequest): Promise<void> {
        await this.instance.delete(`articles/admin/article-packages/${articlePackageId}/articles/${articleId}`);
    }

    //USERS

    async getArticlePackages(data: GetArticlePackagesRequest): Promise<GetArticlePackagesResponse> {
        const response = await this.instance.post("articles/article-packages/list", data);
        return $GetArticlePackagesResponse.parse(response);
    }
}

export const articlePackageApi = new ArticlePackageApi(axios);
