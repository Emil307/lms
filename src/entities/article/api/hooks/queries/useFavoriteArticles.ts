import { ArticleTypes, EntityNames, QueryKeys } from "@shared/constant";
import { ArticleFromList, GetFavoriteArticlesRequest, articleApi } from "@entities/article";
import { useInfiniteRequest } from "@shared/utils";

export const useFavoriteArticles = (data: Omit<GetFavoriteArticlesRequest, "page">) => {
        return useInfiniteRequest<ArticleFromList>(
                [QueryKeys.GET_ARTICLES, [EntityNames.ARTICLE, EntityNames.CATEGORY, EntityNames.TAG], ArticleTypes.FAVORITE, data],
                ({ pageParam = 1 }) => articleApi.getFavoriteArticles({ ...data, page: pageParam }),
                { keepPreviousData: true },
        );
};

