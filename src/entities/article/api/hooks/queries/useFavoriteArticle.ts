import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { GetFavoriteArticleResponse, articleApi } from "@entities/article";

export const useFavoriteArticle = (id: string) => {
    return useQuery<GetFavoriteArticleResponse>([QueryKeys.GET_FAVORITE_ARTICLE, id], () => articleApi.getFavoriteArticle(id), {
        enabled: !!id,
    });
};
