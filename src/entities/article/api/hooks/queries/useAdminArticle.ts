import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { AdminArticleDetails, articleApi } from "@entities/article";

export const useAdminArticle = (id?: string) => {
    return useQuery<AdminArticleDetails>([QueryKeys.GET_ADMIN_ARTICLE], () => articleApi.getAdminArticle(id), { enabled: !!id });
};
