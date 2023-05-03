import { QueryKeys } from "@shared/constant";
import { ArticleFromArticlePackage, articleApi } from "@entities/article";
import { useInfiniteRequest } from "@shared/utils";

export const useArticlesFromArticlePackage = (articlePackageId: number) => {
    return useInfiniteRequest<ArticleFromArticlePackage>([QueryKeys.GET_ARTICLES_FROM_ARTICLE_PACKAGE], () =>
        articleApi.getArticlesFromArticlePackage(articlePackageId)
    );
};
