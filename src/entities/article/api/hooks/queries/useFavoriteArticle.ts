import { useQuery } from "@tanstack/react-query";
import { ArticleTypes, QueryKeys } from "@shared/constant";
import { GetFavoriteArticleRequest, GetFavoriteArticleResponse, articleApi } from "@entities/article";

export const useFavoriteArticle = ({ id }: GetFavoriteArticleRequest) => {
    return useQuery<GetFavoriteArticleResponse>(
        [QueryKeys.GET_ARTICLE, ArticleTypes.FAVORITE, id],
        () => articleApi.getFavoriteArticle({ id }),
        {
            enabled: !!id,
        }
    );
};
