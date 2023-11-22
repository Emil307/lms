import { useQuery } from "@tanstack/react-query";
import { ArticleTypes, QueryKeys } from "@shared/constant";
import { GetArticleByCategoryRequest, GetArticleByCategoryResponse, articleApi } from "@entities/article";

export const useArticleByCategory = ({ id, categoryId }: GetArticleByCategoryRequest) => {
    return useQuery<GetArticleByCategoryResponse>(
        [QueryKeys.GET_ARTICLE, ArticleTypes.BY_CATEGORY, id, categoryId],
        () => articleApi.getArticleByCategory({ id, categoryId }),
        {
            enabled: !!id,
        }
    );
};
