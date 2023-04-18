import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { articleApi, GetArticlePackagesResponse } from "@entities/article";

export const useArticlePackages = () => {
    return useQuery<GetArticlePackagesResponse>([QueryKeys.GET_ARTICLE_PACKAGES], () => articleApi.getArticlePackages());
};
