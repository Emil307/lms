import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { GetAdminArticleRequest, GetAdminArticleResponse, articleApi } from "@entities/article";

export const useAdminArticle = ({ id }: GetAdminArticleRequest) => {
    return useQuery<GetAdminArticleResponse>([QueryKeys.GET_ADMIN_ARTICLE, id], () => articleApi.getAdminArticle({ id }), {
        enabled: !!id,
    });
};
