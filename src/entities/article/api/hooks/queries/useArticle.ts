import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { GetArticleResponse, articleApi } from "@entities/article";

export const useArticle = (id: string) => {
    return useQuery<GetArticleResponse>([QueryKeys.GET_ARTICLE, id], () => articleApi.getArticle(id), { enabled: !!id });
};
