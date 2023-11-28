import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { articleApi, GetAdminArticleResourcesCreateResponse } from "@entities/article";
import { FormErrorResponse } from "@shared/types";

export const useAdminArticleResourcesCreate = (): UseQueryResult<GetAdminArticleResourcesCreateResponse, AxiosError<FormErrorResponse>> => {
    return useQuery(
        [QueryKeys.GET_ADMIN_ARTICLE_RESOURCES_CREATE, [EntityNames.ARTICLE, EntityNames.CATEGORY, EntityNames.TAG, EntityNames.COURSE]],
        () => articleApi.getAdminArticleResourcesCreate()
    );
};
