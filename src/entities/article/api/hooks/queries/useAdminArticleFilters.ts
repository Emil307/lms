import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { articleApi, GetAdminArticleFiltersResponse } from "@entities/article";

export const useAdminArticleFilters = () => {
    return useQuery<GetAdminArticleFiltersResponse>([QueryKeys.GET_ADMIN_ARTICLE_FILTERS], () => articleApi.getAdminArticleFilters());
};
