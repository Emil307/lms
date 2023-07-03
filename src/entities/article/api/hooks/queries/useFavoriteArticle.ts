import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { GetFavoriteArticleRequest, GetFavoriteArticleResponse, articleApi } from "@entities/article";

export const useFavoriteArticle = ({ id }: GetFavoriteArticleRequest) => {
    return useQuery<GetFavoriteArticleResponse>([QueryKeys.GET_FAVORITE_ARTICLE, id], () => articleApi.getFavoriteArticle({ id }), {
        enabled: !!id,
    });
};
