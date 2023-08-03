import dayjs from "dayjs";
import { ArticleAndArticleCategoryFiltersForm } from "@entities/article";
import { TRouterQueries } from "./types";

export const prepareQueryParams = (values: ArticleAndArticleCategoryFiltersForm) => {
    const params = {} as Record<string, any>;

    Object.keys(values).forEach((key) => {
        const value = values[key as keyof ArticleAndArticleCategoryFiltersForm];

        if (value instanceof Date) {
            params[key] = dayjs(value).format("YYYY-MM-DD");
            return;
        }
        params[key] = value;
    });

    return params;
};

export const adaptCourseArticleFiltersForm = (queryParams: TRouterQueries): Partial<ArticleAndArticleCategoryFiltersForm> => {
    const { tags = [], subcategoryIds = [], ...rest } = queryParams;

    return {
        ...rest,
        tags: Array.isArray(tags) ? tags : [tags],
        subcategoryIds: Array.isArray(subcategoryIds) ? subcategoryIds : [subcategoryIds],
    };
};
