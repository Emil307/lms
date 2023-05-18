import { ArticleFromArticlePackage, GetArticlesFromArticlePackageRequest, articlePackageApi } from "@entities/articlePackage";
import { QueryKeys } from "@shared/constant";
import { useInfiniteRequest } from "@shared/utils";

export const useArticlesFromArticlePackage = (data: Omit<GetArticlesFromArticlePackageRequest, "page">) => {
    return useInfiniteRequest<ArticleFromArticlePackage>([QueryKeys.GET_ARTICLES_FROM_ARTICLE_PACKAGE, data], ({ pageParam = 1 }) =>
        articlePackageApi.getArticlesFromArticlePackage({ ...data, page: pageParam })
    );
};
