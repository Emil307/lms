import { QueryKeys } from "@shared/constant";
import { articleApi, ArticleCategoryFromList, GetArticleCategoriesRequest } from "@entities/article";
import { useInfiniteRequest } from "@shared/utils";

export const useArticleCategories = (params: Omit<GetArticleCategoriesRequest, "page">) => {
    return useInfiniteRequest<ArticleCategoryFromList>(
        [QueryKeys.GET_ARTICLE_CATEGORIES, params],
        ({ pageParam = 1 }) => articleApi.getArticleCategories({ ...params, page: pageParam }),
        { keepPreviousData: true },
    );
};
