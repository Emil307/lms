import { QueryKeys } from "@shared/constant";
import { articleApi, ArticlePackage } from "@entities/article";
import { useInfiniteRequest } from "@shared/utils";

export const useArticlePackages = () => {
    return useInfiniteRequest<ArticlePackage>([QueryKeys.GET_ARTICLE_PACKAGES], () => articleApi.getArticlePackages());
};
