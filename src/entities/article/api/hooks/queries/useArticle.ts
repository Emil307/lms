import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { GetArticleRequest, GetArticleResponse, articleApi } from "@entities/article";
import { FormErrorResponse } from "@shared/types";

export const useArticle = ({ id }: GetArticleRequest): UseQueryResult<GetArticleResponse, AxiosError<FormErrorResponse>> => {
    return useQuery(
        [QueryKeys.GET_ARTICLE, [EntityNames.ARTICLE, EntityNames.CATEGORY, EntityNames.TAG, EntityNames.MATERIAL], id],
        () => articleApi.getArticle({ id }),
        {
            enabled: !!id,
        }
    );
};
