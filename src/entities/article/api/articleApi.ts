import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import {
    $AdminArticleDetails,
    $GetAdminArticleMaterialsResponse,
    $GetAdminArticlesResourceResponse,
    $GetAdminArticlesResponse,
    $GetArticleCategoriesResponse,
    $GetArticleCoursesResponse,
    $GetArticleFiltersResponse,
    $GetArticlePackagesResponse,
    $GetArticlesFromArticlePackage,
    $GetArticlesResponse,
    $UpdateActivityStatusArticleResponse,
    AdminArticleDetails,
    ArticleCategoryFilters,
    CreateArticleRequest,
    DeleteAdminArticleMaterialRequest,
    GetAdminArticleMaterialsRequest,
    GetAdminArticleMaterialsResponse,
    GetAdminArticlesRequest,
    GetAdminArticlesResourceResponse,
    GetAdminArticlesResponse,
    GetArticleCategoriesResponse,
    GetArticleCoursesResponse,
    GetArticleFiltersResponse,
    GetArticlePackagesResponse,
    GetArticlesFromArticlePackage,
    GetArticlesResponse,
    UpdateActivityStatusArticleRequest,
    UpdateActivityStatusArticleResponse,
    UpdateArticleRequest,
} from "./types";

class ArticleApi extends BaseApi {
    async getAdminArticles({
        isActive,
        categoryId,
        subcategoryId,
        courseId,
        ...params
    }: GetAdminArticlesRequest): Promise<GetAdminArticlesResponse> {
        const response = await this.instance.post("admin/articles/list", {
            ...params,
            filter: {
                isActive,
                categoryId,
                subcategoryId,
                courseId,
            },
        });
        return $GetAdminArticlesResponse.parse(response);
    }

    async getAdminArticle(id?: string): Promise<AdminArticleDetails> {
        const response = await this.instance.get(`admin/articles/${id}`);
        return $AdminArticleDetails.parse(response);
    }

    async getAdminArticleResource(): Promise<GetAdminArticlesResourceResponse> {
        const response = await this.instance.get("admin/articles/resource");
        return $GetAdminArticlesResourceResponse.parse(response);
    }

    async getArticlePackages(): Promise<GetArticlePackagesResponse> {
        const response = await this.instance.get("article-packages");
        return $GetArticlePackagesResponse.parse(response);
    }
    async getArticlesFromArticlePackage(articlePackageId: number): Promise<GetArticlesFromArticlePackage> {
        const response = await this.instance.get(`article-packages/${articlePackageId}/articles`);
        return $GetArticlesFromArticlePackage.parse(response);
    }
    async getArticles(): Promise<GetArticlesResponse> {
        const response = await this.instance.get("articles");
        return $GetArticlesResponse.parse(response);
    }
    async getArticleCategories(data: ArticleCategoryFilters): Promise<GetArticleCategoriesResponse> {
        const response = await this.instance.get("articles-by-category", { data });
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

    async createArticle(data: CreateArticleRequest): Promise<AdminArticleDetails> {
        const response = await this.instance.post("admin/articles", data);
        return $AdminArticleDetails.parse(response);
    }

    async updateArticle({ id, ...data }: UpdateArticleRequest & { id: string }): Promise<AdminArticleDetails> {
        const response = await this.instance.put(`admin/articles/${id}`, data);
        return $AdminArticleDetails.parse(response);
    }

    async deleteArticle(id: string): Promise<void> {
        await this.instance.delete(`admin/articles/${id}`);
    }

    async updateActivityStatusArticle({ id, isActive }: UpdateActivityStatusArticleRequest): Promise<UpdateActivityStatusArticleResponse> {
        const response = await this.instance.put(`admin/articles/${id}/activity-status`, { isActive });
        return $UpdateActivityStatusArticleResponse.parse(response);
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
