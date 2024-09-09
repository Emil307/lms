import { TFunctionParams } from "@shared/ui/DataGrid/types";
import { ArticleAndArticleCategoryFiltersForm, GetArticlesRequest } from "@entities/article";

export const adaptGetArticlesRequest = (params: TFunctionParams<ArticleAndArticleCategoryFiltersForm>): GetArticlesRequest => {
    const { tags = [], subcategoryIds = [], categoryId, courseId, ...rest } = params;

    const filters: any = {};

    if (categoryId) {
        filters["category.id"] = categoryId;
    }

    if (tags.length > 0) {
        filters.tagIds = {
            items: Array.isArray(tags) ? tags : [tags],
            operator: "or",
        };
    }

    if (subcategoryIds.length > 0) {
        filters.subcategoryIds = {
            items: Array.isArray(subcategoryIds) ? subcategoryIds : [subcategoryIds],
            operator: "or",
        };
    }

    if (courseId) {
        filters.courseIds = courseId;
    }

    return {
        ...rest,
        filter: Object.keys(filters).length > 0 ? filters : {},
    };
};
