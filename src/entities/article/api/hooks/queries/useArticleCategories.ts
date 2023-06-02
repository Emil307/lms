import { QueryKeys } from "@shared/constant";
import { articleApi, ArticleCategoryFilters, ArticleCategoryFromList } from "@entities/article";
import { useInfiniteRequest } from "@shared/utils";

export const useArticleCategories = (filters: ArticleCategoryFilters) => {
    return useInfiniteRequest<ArticleCategoryFromList>([QueryKeys.GET_ARTICLE_CATEGORIES, filters], ({ pageParam = 1 }) =>
        articleApi.getArticleCategories({ ...filters, page: pageParam })
    );
};
