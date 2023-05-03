import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import {
    $adminArticleDetails,
    $getAdminArticleMaterialsResponse,
    $getAdminArticlesResourceResponse,
    $getAdminArticlesResponse,
    $getArticleCategoriesResponse,
    $getArticleCoursesResponse,
    $getArticleFiltersResponse,
    $getArticlePackagesResponse,
    $getArticlesFromArticlePackage,
    $getArticlesResponse,
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
        const response = await this.instance.get("admin/articles", {
            params: {
                ...params,
                filter: {
                    isActive,
                    categoryId,
                    subcategoryId,
                    courseId,
                },
            },
        });
        return $getAdminArticlesResponse.parse(response);
    }

    async getAdminArticle(id?: string): Promise<AdminArticleDetails> {
        const response = await this.instance.get(`admin/articles/${id}`);
        return $adminArticleDetails.parse(response);
    }

    async getAdminArticleResource(): Promise<GetAdminArticlesResourceResponse> {
        const response = await this.instance.get("admin/articles/resource");
        return $getAdminArticlesResourceResponse.parse(response);
    }

    async getArticlePackages(): Promise<GetArticlePackagesResponse> {
        const response = await this.instance.get("article-packages");
        return $getArticlePackagesResponse.parse(response);
    }
    async getArticlesFromArticlePackage(articlePackageId: number): Promise<GetArticlesFromArticlePackage> {
        const response = await this.instance.get(`article-packages/${articlePackageId}/articles`);
        return $getArticlesFromArticlePackage.parse(response);
    }
    async getArticles(): Promise<GetArticlesResponse> {
        const response = await this.instance.get("articles");
        return $getArticlesResponse.parse(response);
    }
    async getArticleCategories(data: ArticleCategoryFilters): Promise<GetArticleCategoriesResponse> {
        const response = await this.instance.get("articles-by-category", { data });
        return $getArticleCategoriesResponse.parse(response);
    }
    async getArticleFilters(): Promise<GetArticleFiltersResponse> {
        const response = await this.instance.get("articles/filters");
        return $getArticleFiltersResponse.parse(response);
    }
    async getArticleCourses(): Promise<GetArticleCoursesResponse> {
        const response = await this.instance.get("articles-by-course");
        return $getArticleCoursesResponse.parse(response);
    }

    async createArticle(data: CreateArticleRequest): Promise<AdminArticleDetails> {
        const response = await this.instance.post("admin/articles", data);
        return $adminArticleDetails.parse(response);
    }

    async updateArticle({ id, ...data }: UpdateArticleRequest & { id: string }): Promise<AdminArticleDetails> {
        const response = await this.instance.put(`admin/articles/${id}`, data);
        return $adminArticleDetails.parse(response);
    }

    async deleteArticle(id: string): Promise<void> {
        await this.instance.delete(`admin/articles/${id}`);
    }

    async activateArticle(id: string): Promise<void> {
        await axios.put(`admin/articles/${id}/activate`);
    }

    async deactivateArticle(id: string): Promise<void> {
        await axios.put(`admin/articles/${id}/deactivate`);
    }

    //MATERIALS

    async getAdminArticleMaterials({ articleId, ...params }: GetAdminArticleMaterialsRequest): Promise<GetAdminArticleMaterialsResponse> {
        const response = await this.instance.get(`admin/articles/${articleId}/materials`, { params });
        return $getAdminArticleMaterialsResponse.parse(response);
    }

    async deleteArticleMaterial({ articleId, materialId }: DeleteAdminArticleMaterialRequest): Promise<void> {
        await this.instance.delete(`admin/articles/${articleId}/materials/${materialId}`);
    }
}

export const articleApi = new ArticleApi(axios);
