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
    GetAdminArticlesNoIncludedArticlePackageRequest,
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

class ArticleApi extends BaseApi {
    /**
     *
     * ADMIN
     *
     */
    async getAdminArticles(
        params: GetAdminArticlesRequest | GetAdminArticlesNoIncludedArticlePackageRequest,
    ): Promise<GetAdminArticlesResponse> {
        const response = await this.instance.post("admin/articles/list", params);
        return $GetAdminArticlesResponse.parse(response);
    }

    async getAdminArticle({ id }: GetAdminArticleRequest): Promise<GetAdminArticleResponse> {
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

    //ARTICLES <---> MATERIALS ADMIN
    async attachMaterialFilesToArticle({
        articleId,
        ...data
    }: AttachMaterialFilesToArticleRequest): Promise<AttachMaterialFilesToArticleResponse> {
        const response = await this.instance.post(`admin/articles/${articleId}/materials`, data);
        return $AttachMaterialFilesToArticleResponse.parse(response);
    }

    async deleteArticleMaterial({ articleId, materialId }: DeleteAdminArticleMaterialRequest): Promise<DeleteAdminArticleMaterialResponse> {
        const response = await this.instance.delete(`admin/articles/${articleId}/materials/${materialId}`);
        return $DeleteAdminArticleMaterialResponse.parse(response);
    }

    //ARTICLES <---> COURSES ADMIN
    async attachCoursesToArticle({ articleId, ...data }: AttachCoursesToArticleRequest): Promise<AttachCoursesToArticleResponse> {
        const response = await this.instance.post(`admin/articles/${articleId}/courses`, data);
        return $AttachCoursesToArticleResponse.parse(response);
    }

    async deleteArticleCourse({ articleId, courseId }: DeleteArticleCourseRequest): Promise<DeleteArticleCourseResponse> {
        const response = await this.instance.delete(`admin/articles/${articleId}/courses/${courseId}`);
        return $DeleteArticleCourseResponse.parse(response);
    }

    /**
     *
     * USER
     *
     */

    async getArticles(params: GetArticlesRequest): Promise<GetArticlesResponse> {
        const response = await this.instance.post("articles/list", params);
        return $GetArticlesResponse.parse(response);
    }

    async getArticle({ id }: GetArticleRequest): Promise<GetArticleResponse> {
        const response = await this.instance.get(`articles/${id}`);
        return $GetArticleResponse.parse(response);
    }

    async getArticleFilters(): Promise<GetArticlesFiltersResponse> {
        const response = await this.instance.get("articles/filters");
        return $GetArticlesFiltersResponse.parse(response);
    }

    //FAVORITE
    async getFavoriteArticles(params: GetFavoriteArticlesRequest): Promise<GetFavoriteArticlesResponse> {
        const response = await this.instance.post("articles/favorite/list", params);
        return $GetFavoriteArticlesResponse.parse(response);
    }

    async getFavoriteArticle({ id }: GetFavoriteArticleRequest): Promise<GetFavoriteArticleResponse> {
        const response = await this.instance.get(`articles/favorite/${id}`);
        return $GetFavoriteArticleResponse.parse(response);
    }

    async getFavoriteArticleFilters(): Promise<GetFavoriteArticlesFiltersResponse> {
        const response = await this.instance.get("articles/favorite/filters");
        return $GetFavoriteArticlesFiltersResponse.parse(response);
    }

    async updateArticleFavoriteStatus({
        id,
        isFavorite,
    }: UpdateArticleFavoriteStatusRequest): Promise<UpdateArticleFavoriteStatusResponse> {
        const response = await this.instance.post(`articles/${id}/favorite-status`, { isFavorite });
        return $UpdateArticleFavoriteStatusResponse.parse(response);
    }

    //MY-ARTICLES
    async getMyArticles(params: GetMyArticlesRequest): Promise<GetMyArticlesResponse> {
        const response = await this.instance.post("me/articles/list", params);
        return $GetMyArticlesResponse.parse(response);
    }

    async getMyArticle({ id }: GetMyArticleRequest): Promise<GetMyArticleResponse> {
        const response = await this.instance.get(`me/articles/${id}`);
        return $GetMyArticleResponse.parse(response);
    }

    async getMyArticleFilters(): Promise<GetMyArticlesFiltersResponse> {
        const response = await this.instance.get("me/articles/filters");
        return $GetMyArticlesFiltersResponse.parse(response);
    }

    //ARTICLES BY CATEGORY
    async getArticleCategories(data: GetArticleCategoriesRequest): Promise<GetArticleCategoriesResponse> {
        const response = await this.instance.post("articles/by-category", data);
        return $GetArticleCategoriesResponse.parse(response);
    }

    async getArticleByCategory({ id, categoryId }: GetArticleByCategoryRequest): Promise<GetArticleByCategoryResponse> {
        const response = await this.instance.get(`category/${categoryId}/article/${id}`);
        return $GetArticleByCategoryResponse.parse(response);
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

    //ARTICLES <---> COURSES USER
    async getArticleByCourse({ courseId, id }: GetArticleByCourseRequest): Promise<GetArticleByCourseResponse> {
        const response = await this.instance.get(`courses/${courseId}/articles/${id}`);
        return $GetArticleByCourseResponse.parse(response);
    }

    async getArticlesByCourseFilters({ courseId }: GetArticlesByCourseFiltersRequest): Promise<GetArticlesByCourseFiltersResponse> {
        const response = await this.instance.get(`courses/${courseId}/articles/filters`);
        return $GetArticlesByCourseFiltersResponse.parse(response);
    }
}

export const articleApi = new ArticleApi(axios);
