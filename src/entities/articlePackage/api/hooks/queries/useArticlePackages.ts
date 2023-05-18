import { ArticlePackage, articlePackageApi } from "@entities/articlePackage";
import { QueryKeys } from "@shared/constant";
import { useInfiniteRequest } from "@shared/utils";

export const useArticlePackages = () => {
    return useInfiniteRequest<ArticlePackage>([QueryKeys.GET_ARTICLE_PACKAGES], ({ pageParam = 1 }) =>
        articlePackageApi.getArticlePackages(pageParam)
    );
};
