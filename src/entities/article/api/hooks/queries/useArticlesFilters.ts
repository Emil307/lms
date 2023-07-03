import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { articleApi } from "@entities/article";

interface UseArticlesFiltersProps {
    articleType?: "favorite" | "my-articles" | "by-category" | "by-course";
}

export const useArticlesFilters = ({ articleType }: UseArticlesFiltersProps) => {
    return useQuery([QueryKeys.GET_ARTICLES_FILTERS, articleType], () => {
        switch (articleType) {
            case "favorite":
                return articleApi.getFavoriteArticleFilters();
            case "my-articles":
                return articleApi.getMyArticleFilters();
            case "by-course":
                return articleApi.getMyArticleFilters();
            default:
                return articleApi.getArticleFilters();
        }
    });
};
