import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import {
    $CreateArticleResponse,
    $DeleteArticleRatingResponse,
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
    $GetFavoriteArticleResponse,
    $GetFavoriteArticlesResponse,
    $UpdateArticleActivityResponse,
    $UpdateArticleFavoriteResponse,
    $UpdateArticleRatingResponse,
    $UpdateArticleResponse,
    CreateArticleRequest,
    CreateArticleResponse,
    DeleteAdminArticleMaterialRequest,
    DeleteArticleRatingRequest,
    DeleteArticleRatingResponse,
    GetAdminArticleFiltersResponse,
    GetAdminArticleMaterialsRequest,
    GetAdminArticleMaterialsResponse,
    GetAdminArticleResourcesCreateResponse,
    GetAdminArticleResponse,
    GetAdminArticlesNoIncludedArticlePackageRequest,
    GetAdminArticlesRequest,
    GetAdminArticlesResponse,
    GetArticleCategoriesRequest,
    GetArticleCategoriesResponse,
    GetArticleCoursesResponse,
    GetArticleFiltersResponse,
    GetArticleResponse,
    GetArticlesRequest,
    GetArticlesResponse,
    GetFavoriteArticleResponse,
    GetFavoriteArticlesRequest,
    GetFavoriteArticlesResponse,
    UpdateArticleActivityRequest,
    UpdateArticleActivityResponse,
    UpdateArticleFavoriteRequest,
    UpdateArticleFavoriteResponse,
    UpdateArticleRatingRequest,
    UpdateArticleRatingResponse,
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

    async getFavoriteArticles(params: GetFavoriteArticlesRequest): Promise<GetFavoriteArticlesResponse> {
        const response = await this.instance.post("articles/favorite/list", params);
        return $GetFavoriteArticlesResponse.parse(response);
    }

    async getArticle(id: string): Promise<GetArticleResponse> {
        const response = await this.instance.get(`articles/${id}`);
        return $GetArticleResponse.parse(response);
    }

    async getArticleCategories(data: GetArticleCategoriesRequest): Promise<GetArticleCategoriesResponse> {
        const response = await this.instance.post("articles/by-category", data);
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

    //RATING

    async updateArticleRating({ id, status }: UpdateArticleRatingRequest): Promise<UpdateArticleRatingResponse> {
        const response = await this.instance.put(`articles/${id}/rating-status`, { status });
        return $UpdateArticleRatingResponse.parse(response);
    }

    async deleteArticleRating({ id }: DeleteArticleRatingRequest): Promise<DeleteArticleRatingResponse> {
        const response = await this.instance.delete(`articles/${id}/rating-status`);
        return $DeleteArticleRatingResponse.parse(response);
    }

    //FAVORITE
    async updateArticleFavorite({ id, isFavorite }: UpdateArticleFavoriteRequest): Promise<UpdateArticleFavoriteResponse> {
        const response = await this.instance.post(`articles/${id}/favorite-status`, { isFavorite });
        return $UpdateArticleFavoriteResponse.parse(response);
    }

    async getFavoriteArticle(id: string): Promise<GetFavoriteArticleResponse> {
        const response = await this.instance.get(`articles/favorite/${id}`);
        return $GetFavoriteArticleResponse.parse(response);
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
