import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { GetAdminArticleRequest, GetAdminArticleResponse, articleApi } from "@entities/article";
import { FormErrorResponse } from "@shared/types";

export const useAdminArticle = ({ id }: GetAdminArticleRequest): UseQueryResult<GetAdminArticleResponse, AxiosError<FormErrorResponse>> => {
    return useQuery(
        [QueryKeys.GET_ADMIN_ARTICLE, [EntityNames.ARTICLE, EntityNames.CATEGORY, EntityNames.TAG, EntityNames.USER], id],
        () => articleApi.getAdminArticle({ id }),
        {
            enabled: !!id,
        }
    );
};
