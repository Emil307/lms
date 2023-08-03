import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { articleApi } from "@entities/article";

interface UseArticlesFiltersProps {
    articleType?: "favorite" | "my-articles" | "by-category" | "by-course";
    courseId?: string;
}

export const useArticlesFilters = ({ articleType, courseId }: UseArticlesFiltersProps) => {
    return useQuery([QueryKeys.GET_ARTICLES_FILTERS, articleType, courseId], () => {
        switch (articleType) {
            case "favorite":
                return articleApi.getFavoriteArticleFilters();
            case "my-articles":
                return articleApi.getMyArticleFilters();
            case "by-course":
                if (courseId) {
                    return articleApi.getArticlesByCourseFilters({ courseId });
                }
                return articleApi.getArticleFilters();
            default:
                return articleApi.getArticleFilters();
        }
    });
};
