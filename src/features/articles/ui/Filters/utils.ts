import { ArticleAndArticleCategoryFiltersForm } from "@entities/article";
import { TRouterQueries } from "./types";

export const getCountAppliedQueries = (data: TRouterQueries, initialValues: ArticleAndArticleCategoryFiltersForm): number => {
    return Object.entries(data).reduce((acc, currentParam) => {
        if (
            currentParam[0] in initialValues &&
            currentParam[0] !== "courseId" &&
            currentParam[0] !== "categoryId" &&
            !!currentParam[1].length
        ) {
            const count = Array.isArray(currentParam[1]) ? currentParam[1].length : 1;
            return acc + count;
        }

        return acc;
    }, 0);
};
