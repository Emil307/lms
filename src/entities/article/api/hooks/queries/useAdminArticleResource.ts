import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { articleApi, GetAdminArticlesResourceResponse } from "@entities/article";

export const useAdminArticleResource = () => {
    return useQuery<GetAdminArticlesResourceResponse>([QueryKeys.GET_ADMIN_ARTICLE_RESOURCE], () => articleApi.getAdminArticleResource());
};
