import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { articleApi, GetArticleFiltersResponse } from "@entities/article";

export const useArticleFilters = () => {
    return useQuery<GetArticleFiltersResponse>([QueryKeys.GET_ARTICLE_FILTERS], () => articleApi.getArticleFilters());
};
