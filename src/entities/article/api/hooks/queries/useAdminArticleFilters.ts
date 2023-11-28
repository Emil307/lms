import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { articleApi, GetAdminArticleFiltersResponse } from "@entities/article";
import { FormErrorResponse } from "@shared/types";

export const useAdminArticleFilters = (): UseQueryResult<GetAdminArticleFiltersResponse, AxiosError<FormErrorResponse>> => {
    return useQuery(
        [QueryKeys.GET_ADMIN_ARTICLE_FILTERS, [EntityNames.ARTICLE, EntityNames.CATEGORY, EntityNames.TAG, EntityNames.COURSE]],
        () => articleApi.getAdminArticleFilters()
    );
};
