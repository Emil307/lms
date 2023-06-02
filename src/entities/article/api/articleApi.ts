import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import {
    $CreateArticleResponse,
    $GetAdminArticleFiltersResponse,
    $GetAdminArticleMaterialsResponse,
    $GetAdminArticleResourcesCreateResponse,
    $GetAdminArticleResponse,
    $GetAdminArticlesResponse,
    $GetArticleCategoriesResponse,
    $GetArticleCoursesResponse,
    $GetArticleFiltersResponse,
    $GetArticleResponse,
    $GetArticlesResponse,
    $UpdateArticleActivityResponse,
    $UpdateArticleResponse,
    ArticleCategoryFilters,
    CreateArticleRequest,
    CreateArticleResponse,
    DeleteAdminArticleMaterialRequest,
    GetAdminArticleFiltersResponse,
    GetAdminArticleMaterialsRequest,
    GetAdminArticleMaterialsResponse,
    GetAdminArticleResourcesCreateResponse,
    GetAdminArticleResponse,
    GetAdminArticlesNoIncludedArticlePackageRequest,
    GetAdminArticlesRequest,
    GetAdminArticlesResponse,
    GetArticleCategoriesResponse,
    GetArticleCoursesResponse,
    GetArticleFiltersResponse,
    GetArticleResponse,
    GetArticlesRequest,
    GetArticlesResponse,
    UpdateArticleActivityRequest,
    UpdateArticleActivityResponse,
    UpdateArticleRequest,
    UpdateArticleResponse,
} from "./types";

class ArticleApi extends BaseApi {
    async getAdminArticles(
        params: GetAdminArticlesRequest | GetAdminArticlesNoIncludedArticlePackageRequest
    ): Promise<GetAdminArticlesResponse> {
        const response = await this.instance.post("admin/articles/list", params);
        return $GetAdminArticlesResponse.parse(response);
    }

    async getAdminArticle(id: string): Promise<GetAdminArticleResponse> {
        const response = await this.instance.get(`admin/articles/${id}`);
        return $GetAdminArticleResponse.parse(response);
    }

    async getAdminArticleFilters(): Promise<GetAdminArticleFiltersResponse> {
        const response = await this.instance.get("admin/articles/filters");
        return $GetAdminArticleFiltersResponse.parse(response);
    }

    async getAdminArticleResourcesCreate(): Promise<GetAdminArticleResourcesCreateResponse> {
        const response = await this.instance.get("admin/articles/create");
        return $GetAdminArticleResourcesCreateResponse.parse(response);
    }

    async getArticles(params: GetArticlesRequest): Promise<GetArticlesResponse> {
        const response = await this.instance.post("articles/list", params);
        return $GetArticlesResponse.parse(response);
    }

    async getArticle(id: string): Promise<GetArticleResponse> {
        const response = await this.instance.get(`articles/${id}`);
        return $GetArticleResponse.parse(response);
    }

    async getArticleCategories(data: ArticleCategoryFilters): Promise<GetArticleCategoriesResponse> {
        const response = await this.instance.post("articles/by-category", { data });
        return $GetArticleCategoriesResponse.parse(response);
    }
    async getArticleFilters(): Promise<GetArticleFiltersResponse> {
        const response = await this.instance.get("articles/filters");
        return $GetArticleFiltersResponse.parse(response);
    }
    async getArticleCourses(): Promise<GetArticleCoursesResponse> {
        const response = await this.instance.get("articles-by-course");
        return $GetArticleCoursesResponse.parse(response);
    }

    async createArticle(data: CreateArticleRequest): Promise<CreateArticleResponse> {
        const response = await this.instance.post("admin/articles", data);
        return $CreateArticleResponse.parse(response);
    }

    async updateArticle({ id, ...data }: UpdateArticleRequest): Promise<UpdateArticleResponse> {
        const response = await this.instance.put(`admin/articles/${id}`, data);
        return $UpdateArticleResponse.parse(response);
    }

    async deleteArticle(id: string): Promise<void> {
        await this.instance.delete(`admin/articles/${id}`);
    }

    async updateArticleActivity({ id, isActive }: UpdateArticleActivityRequest): Promise<UpdateArticleActivityResponse> {
        const response = await this.instance.put(`admin/articles/${id}/activity-status`, { isActive });
        return $UpdateArticleActivityResponse.parse(response);
    }

    //MATERIALS

    async getAdminArticleMaterials({ articleId, ...params }: GetAdminArticleMaterialsRequest): Promise<GetAdminArticleMaterialsResponse> {
        const response = await this.instance.get(`admin/articles/${articleId}/materials`, { params });
        return $GetAdminArticleMaterialsResponse.parse(response);
    }

    async deleteArticleMaterial({ articleId, materialId }: DeleteAdminArticleMaterialRequest): Promise<void> {
        await this.instance.delete(`admin/articles/${articleId}/materials/${materialId}`);
    }
}

export const articleApi = new ArticleApi(axios);
