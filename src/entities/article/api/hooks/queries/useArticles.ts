import { EntityNames, QueryKeys } from "@shared/constant";
import { ArticleFromList, GetArticlesRequest, articleApi } from "@entities/article";
import { useInfiniteRequest } from "@shared/utils";

export const useArticles = (data: Omit<GetArticlesRequest, "page">) => {
    return useInfiniteRequest<ArticleFromList>(
        [
            QueryKeys.GET_ARTICLES,
            [EntityNames.ARTICLE, EntityNames.CATEGORY, EntityNames.ARTICLE_PACKAGE, EntityNames.TAG, EntityNames.COURSE],
            data,
        ],
        ({ pageParam = 1 }) => articleApi.getArticles({ ...data, page: pageParam })
    );
};
