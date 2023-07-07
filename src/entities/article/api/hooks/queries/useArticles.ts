import { QueryKeys } from "@shared/constant";
import { ArticleFromList, GetArticlesRequest, articleApi } from "@entities/article";
import { useInfiniteRequest } from "@shared/utils";

export const useArticles = (data: Omit<GetArticlesRequest, "page">) => {
    return useInfiniteRequest<ArticleFromList>([QueryKeys.GET_ARTICLES, data], ({ pageParam = 1 }) =>
        articleApi.getArticles({ ...data, page: pageParam }),
    );
};
