import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { GetAdminArticlePackageResponse, articlePackageApi } from "@entities/articlePackage";
import { FormErrorResponse } from "@shared/types";

export const useAdminArticlePackage = (id?: string): UseQueryResult<GetAdminArticlePackageResponse, AxiosError<FormErrorResponse>> => {
    return useQuery(
        [QueryKeys.GET_ADMIN_ARTICLE_PACKAGE, [EntityNames.ARTICLE_PACKAGE, EntityNames.CATEGORY, EntityNames.TAG, EntityNames.USER], id],
        () => articlePackageApi.getAdminArticlePackage(id),
        {
            enabled: !!id,
        }
    );
};
