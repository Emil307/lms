import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ArticleTypes, EntityNames, QueryKeys } from "@shared/constant";
import { GetArticleByCategoryRequest, GetArticleByCategoryResponse, articleApi } from "@entities/article";
import { FormErrorResponse } from "@shared/types";

export const useArticleByCategory = ({
    id,
    categoryId,
}: GetArticleByCategoryRequest): UseQueryResult<GetArticleByCategoryResponse, AxiosError<FormErrorResponse>> => {
    return useQuery(
        [
            QueryKeys.GET_ARTICLE,
            [EntityNames.ARTICLE, EntityNames.CATEGORY, EntityNames.TAG, EntityNames.MATERIAL],
            ArticleTypes.BY_CATEGORY,
            id,
            categoryId,
        ],
        () => articleApi.getArticleByCategory({ id, categoryId }),
        {
            enabled: !!id,
        }
    );
};
