import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ArticleTypes, EntityNames, QueryKeys } from "@shared/constant";
import { GetFavoriteArticleRequest, GetFavoriteArticleResponse, articleApi } from "@entities/article";
import { FormErrorResponse } from "@shared/types";

export const useFavoriteArticle = ({
    id,
}: GetFavoriteArticleRequest): UseQueryResult<GetFavoriteArticleResponse, AxiosError<FormErrorResponse>> => {
    return useQuery(
        [
            QueryKeys.GET_ARTICLE,
            [EntityNames.ARTICLE, EntityNames.CATEGORY, EntityNames.TAG, EntityNames.MATERIAL],
            ArticleTypes.FAVORITE,
            id,
        ],
        () => articleApi.getFavoriteArticle({ id }),
        {
            enabled: !!id,
        }
    );
};
