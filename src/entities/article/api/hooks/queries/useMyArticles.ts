import { ArticleTypes, QueryKeys } from "@shared/constant";
import { ArticleFromList, GetMyArticlesRequest, articleApi } from "@entities/article";
import { useInfiniteRequest } from "@shared/utils";

export const useMyArticles = (data: Omit<GetMyArticlesRequest, "page">) => {
    return useInfiniteRequest<ArticleFromList>(
        [QueryKeys.GET_ARTICLES, ArticleTypes.MY_ARTICLE, data],
        ({ pageParam = 1 }) => articleApi.getMyArticles({ ...data, page: pageParam }),
        { keepPreviousData: true }
    );
};
