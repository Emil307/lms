import { useQuery } from "@tanstack/react-query";
import { ArticleTypes, QueryKeys } from "@shared/constant";
import { articleApi } from "@entities/article";

interface UseArticlesFiltersProps {
    articleType?: ArticleTypes;
    courseId?: string;
}

export const useArticlesFilters = ({ articleType, courseId }: UseArticlesFiltersProps) => {
    return useQuery([QueryKeys.GET_ARTICLES_FILTERS, articleType, courseId], () => {
        switch (articleType) {
            case ArticleTypes.FAVORITE:
                return articleApi.getFavoriteArticleFilters();
            case ArticleTypes.MY_ARTICLE:
                return articleApi.getMyArticleFilters();
            case ArticleTypes.BY_COURSE:
                if (courseId) {
                    return articleApi.getArticlesByCourseFilters({ courseId });
                }
                return articleApi.getArticleFilters();
            default:
                return articleApi.getArticleFilters();
        }
    });
};
