import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { GetArticleByCategoryRequest, GetArticleByCategoryResponse, articleApi } from "@entities/article";

export const useArticleByCategory = ({ id, categoryId }: GetArticleByCategoryRequest) => {
    return useQuery<GetArticleByCategoryResponse>(
        [QueryKeys.GET_ARTICLE, "by-category", id, categoryId],
        () => articleApi.getArticleByCategory({ id, categoryId }),
        {
            enabled: !!id,
        }
    );
};
