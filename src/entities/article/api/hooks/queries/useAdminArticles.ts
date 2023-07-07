import { QueryKeys } from "@shared/constant";
import { AdminArticleFromList, GetAdminArticlesRequest, articleApi } from "@entities/article";
import { useInfiniteRequest } from "@shared/utils";

export const useAdminArticles = (data: Omit<GetAdminArticlesRequest, "page">) => {
    return useInfiniteRequest<AdminArticleFromList>([QueryKeys.GET_ADMIN_ARTICLES_INFINITY, data], ({ pageParam = 1 }) =>
        articleApi.getAdminArticles({ ...data, page: pageParam }),
    );
};
