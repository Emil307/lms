import { ArticleAndArticleCategoryFiltersForm } from "@entities/article";

export const initialFilterValues: ArticleAndArticleCategoryFiltersForm = {
    userId: 0,
    query: "",
    tags: [],
    subcategoryIds: [],
};
