import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ArticleTypes, EntityNames, QueryKeys } from "@shared/constant";
import { GetMyArticleRequest, GetMyArticleResponse, articleApi } from "@entities/article";
import { FormErrorResponse } from "@shared/types";

export const useMyArticle = ({ id }: GetMyArticleRequest): UseQueryResult<GetMyArticleResponse, AxiosError<FormErrorResponse>> => {
    return useQuery(
        [
            QueryKeys.GET_ARTICLE,
            [EntityNames.ARTICLE, EntityNames.CATEGORY, EntityNames.TAG, EntityNames.MATERIAL],
            ArticleTypes.MY_ARTICLE,
            id,
        ],
        () => articleApi.getMyArticle({ id }),
        {
            enabled: !!id,
        }
    );
};
