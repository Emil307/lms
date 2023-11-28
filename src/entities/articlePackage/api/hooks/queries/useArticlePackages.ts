import { ArticlePackageFromList, GetArticlePackagesRequest, articlePackageApi } from "@entities/articlePackage";
import { EntityNames, QueryKeys } from "@shared/constant";
import { useInfiniteRequest } from "@shared/utils";

export const useArticlePackages = (data: Omit<GetArticlePackagesRequest, "page">) => {
    return useInfiniteRequest<ArticlePackageFromList>(
        [
            QueryKeys.GET_ARTICLE_PACKAGES,
            [EntityNames.ARTICLE_PACKAGE, EntityNames.ARTICLE, EntityNames.CATEGORY, EntityNames.COURSE],
            data,
        ],
        ({ pageParam = 1 }) => articlePackageApi.getArticlePackages({ ...data, page: pageParam })
    );
};
