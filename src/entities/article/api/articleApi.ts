import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import {
    $AttachCoursesToArticleResponse,
    $AttachMaterialFilesToArticleResponse,
    $CreateArticleResponse,
    $DeleteArticleRatingResponse,
    $DeleteAdminArticleMaterialResponse,
    $DeleteArticleCourseResponse,
    $GetAdminArticleFiltersResponse,
    $GetAdminArticleResourcesCreateResponse,
    $GetAdminArticleResponse,
    $GetAdminArticlesResponse,
    $GetArticleCategoriesResponse,
    $GetArticleResponse,
    $GetArticlesResponse,
    $GetFavoriteArticleResponse,
    $GetFavoriteArticlesResponse,
    $UpdateArticleActivityResponse,
    $UpdateArticleRatingResponse,
    $UpdateArticleResponse,
    AttachCoursesToArticleRequest,
    AttachCoursesToArticleResponse,
    AttachMaterialFilesToArticleRequest,
    AttachMaterialFilesToArticleResponse,
    CreateArticleRequest,
    CreateArticleResponse,
    DeleteAdminArticleMaterialRequest,
    DeleteArticleRatingRequest,
    DeleteArticleRatingResponse,
    DeleteAdminArticleMaterialResponse,
    DeleteArticleCourseRequest,
    DeleteArticleCourseResponse,
    GetAdminArticleFiltersResponse,
    GetAdminArticleResourcesCreateResponse,
    GetAdminArticleResponse,
    GetAdminArticlesRequest,
    GetAdminArticlesResponse,
    GetArticleCategoriesRequest,
    GetArticleCategoriesResponse,
    GetArticleResponse,
    GetArticlesRequest,
    GetArticlesResponse,
    GetFavoriteArticleResponse,
    GetFavoriteArticlesRequest,
    GetFavoriteArticlesResponse,
    UpdateArticleActivityRequest,
    UpdateArticleActivityResponse,
    UpdateArticleRatingRequest,
    UpdateArticleRatingResponse,
    UpdateArticleRequest,
    UpdateArticleResponse,
    GetFavoriteArticleRequest,
    UpdateArticleFavoriteStatusResponse,
    $UpdateArticleFavoriteStatusResponse,
    UpdateArticleFavoriteStatusRequest,
    GetAdminArticleRequest,
    GetArticleRequest,
    GetMyArticleRequest,
    GetMyArticleResponse,
    $GetMyArticleResponse,
    GetArticleByCategoryRequest,
    GetArticleByCategoryResponse,
    $GetArticleByCategoryResponse,
    GetArticlesFiltersResponse,
    $GetArticlesFiltersResponse,
    GetFavoriteArticlesFiltersResponse,
    $GetFavoriteArticlesFiltersResponse,
    GetMyArticlesRequest,
    GetMyArticlesResponse,
    $GetMyArticlesResponse,
    GetMyArticlesFiltersResponse,
    $GetMyArticlesFiltersResponse,
    GetArticleByCourseResponse,
    GetArticleByCourseRequest,
    $GetArticleByCourseResponse,
    GetArticlesByCourseFiltersRequest,
    $GetArticlesByCourseFiltersResponse,
    GetArticlesByCourseFiltersResponse,
} from "./types";

export class ArticleApi extends BaseApi {
    /**
     *
     * ADMIN
     *
     */
    async getAdminArticles(params: GetAdminArticlesRequest): Promise<GetAdminArticlesResponse> {
        const response = await this.instance.post("articles/admin/articles/list", params);
        return $GetAdminArticlesResponse.parse(response);
    }

    async getAdminArticle({ id }: GetAdminArticleRequest): Promise<GetAdminArticleResponse> {
        const response = await this.instance.get(`articles/admin/articles/${id}`);
        return $GetAdminArticleResponse.parse(response);
    }

    async getAdminArticleFilters(): Promise<GetAdminArticleFiltersResponse> {
        const response = await this.instance.get("articles/admin/articles/filters");
        return $GetAdminArticleFiltersResponse.parse(response);
    }

    async getAdminArticleResourcesCreate(): Promise<GetAdminArticleResourcesCreateResponse> {
        const response = await this.instance.get("articles/admin/articles/create");
        return $GetAdminArticleResourcesCreateResponse.parse(response);
    }

    async createArticle(data: CreateArticleRequest): Promise<CreateArticleResponse> {
        const response = await this.instance.post("articles/admin/articles", data);
        return $CreateArticleResponse.parse(response);
    }

    async updateArticle({ id, ...data }: UpdateArticleRequest): Promise<UpdateArticleResponse> {
        const response = await this.instance.put(`articles/admin/articles/${id}`, data);
        return $UpdateArticleResponse.parse(response);
    }

    async deleteArticle(id: string): Promise<void> {
        await this.instance.delete(`articles/admin/articles/${id}`);
    }

    async updateArticleActivity({ id, isActive }: UpdateArticleActivityRequest): Promise<UpdateArticleActivityResponse> {
        const response = await this.instance.put(`articles/admin/articles/${id}/activity-status`, { isActive });
        return $UpdateArticleActivityResponse.parse(response);
    }

    //ARTICLES <---> MATERIALS ADMIN
    async attachMaterialFilesToArticle({
        articleId,
        ...data
    }: AttachMaterialFilesToArticleRequest): Promise<AttachMaterialFilesToArticleResponse> {
        const response = await this.instance.post(`articles/admin/articles/${articleId}/materials`, data);
        return $AttachMaterialFilesToArticleResponse.parse(response);
    }

    async deleteArticleMaterial({ articleId, materialId }: DeleteAdminArticleMaterialRequest): Promise<DeleteAdminArticleMaterialResponse> {
        const response = await this.instance.delete(`articles/admin/articles/${articleId}/materials/${materialId}`);
        return $DeleteAdminArticleMaterialResponse.parse(response);
    }

    //ARTICLES <---> COURSES ADMIN
    async attachCoursesToArticle({ articleId, ...data }: AttachCoursesToArticleRequest): Promise<AttachCoursesToArticleResponse> {
        const response = await this.instance.post(`articles/admin/articles/${articleId}/courses`, data);
        return $AttachCoursesToArticleResponse.parse(response);
    }

    async deleteArticleCourse({ articleId, courseId }: DeleteArticleCourseRequest): Promise<DeleteArticleCourseResponse> {
        const response = await this.instance.delete(`articles/admin/articles/${articleId}/courses/${courseId}`);
        return $DeleteArticleCourseResponse.parse(response);
    }

    /**
     *
     * USER
     *
     */

    async getArticles(params: GetArticlesRequest): Promise<GetArticlesResponse> {
        const response = await this.instance.post("articles/articles/list", params);
        return $GetArticlesResponse.parse(response);
    }

    async getArticle({ id }: GetArticleRequest): Promise<GetArticleResponse> {
        const response = await this.instance.get(`articles/articles/${id}`);
        return $GetArticleResponse.parse(response);
    }

    async getArticleFilters(): Promise<GetArticlesFiltersResponse> {
        const response = await this.instance.get("articles/articles/filters");
        return $GetArticlesFiltersResponse.parse(response);
    }

    //FAVORITE
    async getFavoriteArticles(params: GetFavoriteArticlesRequest): Promise<GetFavoriteArticlesResponse> {
        const response = await this.instance.post("articles/articles/favorite/list", params);
        return $GetFavoriteArticlesResponse.parse(response);
    }

    async getFavoriteArticle({ id }: GetFavoriteArticleRequest): Promise<GetFavoriteArticleResponse> {
        const response = await this.instance.get(`articles/articles/favorite/${id}`);
        return $GetFavoriteArticleResponse.parse(response);
    }

    async getFavoriteArticleFilters(): Promise<GetFavoriteArticlesFiltersResponse> {
        const response = await this.instance.get("articles/articles/favorite/filters");
        return $GetFavoriteArticlesFiltersResponse.parse(response);
    }

    async updateArticleFavoriteStatus({
        id,
        isFavorite,
    }: UpdateArticleFavoriteStatusRequest): Promise<UpdateArticleFavoriteStatusResponse> {
        const response = await this.instance.post(`articles/articles/${id}/favorite-status`, { isFavorite });
        return $UpdateArticleFavoriteStatusResponse.parse(response);
    }

    //MY-ARTICLES
    async getMyArticles(params: GetMyArticlesRequest): Promise<GetMyArticlesResponse> {
        const response = await this.instance.post("articles/me/articles/list", params);
        return $GetMyArticlesResponse.parse(response);
    }

    async getMyArticle({ id }: GetMyArticleRequest): Promise<GetMyArticleResponse> {
        const response = await this.instance.get(`articles/me/articles/${id}`);
        return $GetMyArticleResponse.parse(response);
    }

    async getMyArticleFilters(): Promise<GetMyArticlesFiltersResponse> {
        const response = await this.instance.get("articles/me/articles/filters");
        return $GetMyArticlesFiltersResponse.parse(response);
    }

    //ARTICLES BY CATEGORY
    async getArticleCategories(data: GetArticleCategoriesRequest): Promise<GetArticleCategoriesResponse> {
        const response = await this.instance.post("articles/articles/by-category", data);
        return $GetArticleCategoriesResponse.parse(response);
    }

    async getArticleByCategory({ id, categoryId }: GetArticleByCategoryRequest): Promise<GetArticleByCategoryResponse> {
        const response = await this.instance.get(`articles/category/${categoryId}/article/${id}`);
        return $GetArticleByCategoryResponse.parse(response);
    }

    //RATING
    async updateArticleRating({ id, status }: UpdateArticleRatingRequest): Promise<UpdateArticleRatingResponse> {
        const response = await this.instance.put(`articles/articles/${id}/rating-status`, { status });
        return $UpdateArticleRatingResponse.parse(response);
    }

    async deleteArticleRating({ id }: DeleteArticleRatingRequest): Promise<DeleteArticleRatingResponse> {
        const response = await this.instance.delete(`articles/articles/${id}/rating-status`);
        return $DeleteArticleRatingResponse.parse(response);
    }

    //ARTICLES <---> COURSES USER
    async getArticleByCourse({ courseId, id }: GetArticleByCourseRequest): Promise<GetArticleByCourseResponse> {
        const response = await this.instance.get(`articles/courses/${courseId}/articles/${id}`);
        return $GetArticleByCourseResponse.parse(response);
    }

    async getArticlesByCourseFilters({ courseId }: GetArticlesByCourseFiltersRequest): Promise<GetArticlesByCourseFiltersResponse> {
        const response = await this.instance.get(`articles/courses/${courseId}/articles/filters`);
        return $GetArticlesByCourseFiltersResponse.parse(response);
    }
}

export const articleApi = new ArticleApi(axios);
