import { QueryKeys } from "@shared/constant";
import { Article, articleApi } from "@entities/article";
import { useInfiniteRequest } from "@shared/utils";

export const useArticles = () => {
    //TODO: добавить pageParam когда будем править схемы
    return useInfiniteRequest<Article>([QueryKeys.GET_ARTICLES], () => articleApi.getArticles());
};
