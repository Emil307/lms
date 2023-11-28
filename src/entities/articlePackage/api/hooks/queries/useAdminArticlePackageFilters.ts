import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GetAdminArticlePackageFiltersResponse, articlePackageApi } from "@entities/articlePackage";
import { EntityNames, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";

export const useAdminArticlePackageFilters = (): UseQueryResult<GetAdminArticlePackageFiltersResponse, AxiosError<FormErrorResponse>> => {
    return useQuery(
        [QueryKeys.GET_ADMIN_ARTICLE_PACKAGE_FILTERS, [EntityNames.ARTICLE_PACKAGE, EntityNames.CATEGORY, EntityNames.TAG]],
        () => articlePackageApi.getAdminArticlePackageFilters()
    );
};
