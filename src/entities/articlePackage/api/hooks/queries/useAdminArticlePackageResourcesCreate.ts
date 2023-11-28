import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GetAdminArticlePackageResourcesCreateResponse, articlePackageApi } from "@entities/articlePackage";
import { EntityNames, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";

export const useAdminArticlePackageResourcesCreate = (): UseQueryResult<
    GetAdminArticlePackageResourcesCreateResponse,
    AxiosError<FormErrorResponse>
> => {
    return useQuery(
        [QueryKeys.GET_ADMIN_ARTICLE_PACKAGE_RESOURCES_CREATE, [EntityNames.ARTICLE, EntityNames.CATEGORY, EntityNames.TAG]],
        () => articlePackageApi.getAdminArticlePackageResourcesCreate()
    );
};
