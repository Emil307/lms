import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { GetMyArticleRequest, GetMyArticleResponse, articleApi } from "@entities/article";

export const useMyArticle = ({ id }: GetMyArticleRequest) => {
    return useQuery<GetMyArticleResponse>([QueryKeys.GET_ARTICLE, "my-articles", id], () => articleApi.getMyArticle({ id }), {
        enabled: !!id,
    });
};
