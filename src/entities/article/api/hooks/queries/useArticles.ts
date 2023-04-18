import { QueryKeys } from "@shared/constant";
import { Article, articleApi } from "@entities/article";
import { useInfiniteRequest } from "@shared/utils";

export const useArticles = () => {
    return useInfiniteRequest<Article>([QueryKeys.GET_ARTICLES], () => articleApi.getArticles());
};
