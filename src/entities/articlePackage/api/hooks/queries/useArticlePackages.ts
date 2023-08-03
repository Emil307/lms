import { ArticlePackageFromList, GetArticlePackagesRequest, articlePackageApi } from "@entities/articlePackage";
import { QueryKeys } from "@shared/constant";
import { useInfiniteRequest } from "@shared/utils";

export const useArticlePackages = (data: Omit<GetArticlePackagesRequest, "page">) => {
    return useInfiniteRequest<ArticlePackageFromList>([QueryKeys.GET_ARTICLE_PACKAGES, data], ({ pageParam = 1 }) =>
        articlePackageApi.getArticlePackages({ ...data, page: pageParam })
    );
};
