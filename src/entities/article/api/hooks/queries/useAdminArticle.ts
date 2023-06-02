import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { GetAdminArticleResponse, articleApi } from "@entities/article";

export const useAdminArticle = (id: string) => {
    return useQuery<GetAdminArticleResponse>([QueryKeys.GET_ADMIN_ARTICLE, id], () => articleApi.getAdminArticle(id), { enabled: !!id });
};
