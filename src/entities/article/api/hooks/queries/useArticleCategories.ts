import { QueryKeys } from "@shared/constant";
import { articleApi, ArticleCategory, ArticleCategoryFilters } from "@entities/article";
import { useInfiniteRequest } from "@shared/utils";

export const useArticleCategories = (filters: ArticleCategoryFilters) => {
    return useInfiniteRequest<ArticleCategory>([QueryKeys.GET_ARTICLE_CATEGORIES, filters], ({ pageParam = 1 }) =>
        articleApi.getArticleCategories({ ...filters, page: pageParam })
    );
};
