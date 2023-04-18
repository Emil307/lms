import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import {
    $getArticleCategoriesResponse,
    $getArticleCoursesResponse,
    $getArticleFiltersResponse,
    $getArticlePackagesResponse,
    $getArticlesResponse,
    ArticleCategoryFilters,
    GetArticleCategoriesResponse,
    GetArticleCoursesResponse,
    GetArticleFiltersResponse,
    GetArticlePackagesResponse,
    GetArticlesResponse,
} from "./types";

class ArticleApi extends BaseApi {
    async getArticlePackages(): Promise<GetArticlePackagesResponse> {
        const response = await this.instance.get("article-packages");
        return $getArticlePackagesResponse.parse(response);
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
}

export const articleApi = new ArticleApi(axios);
