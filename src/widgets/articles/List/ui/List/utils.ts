import { TFunctionParams } from "@shared/ui/DataGrid/types";
import { ArticleAndArticleCategoryFiltersForm, GetArticlesRequest } from "@entities/article";

export const adaptGetArticlesRequest = (params: TFunctionParams<ArticleAndArticleCategoryFiltersForm>): GetArticlesRequest => {
    const { tags = [], subcategoryIds = [], categoryId, courseId, ...rest } = params;

    return {
        ...rest,
        filter: {
            "category.id": categoryId,
            tagIds: {
                items: Array.isArray(tags) ? tags : [tags],
                operator: "or",
            },
            subcategoryIds: {
                items: Array.isArray(subcategoryIds) ? subcategoryIds : [subcategoryIds],
                operator: "or",
            },
            ...(courseId && {
                courseIds: courseId,
            }),
        },
    };
};
