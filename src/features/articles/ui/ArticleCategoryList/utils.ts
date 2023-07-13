import { TFunctionParams } from "@shared/ui/DataGrid/types";
import { ArticleAndArticleCategoryFiltersForm, GetArticleCategoriesRequest } from "@entities/article";

export const adaptGetArticleCategoriesRequest = (
    params: TFunctionParams<ArticleAndArticleCategoryFiltersForm>
): GetArticleCategoriesRequest => {
    const { tags = [], subcategoryIds = [], ...rest } = params;

    return {
        ...rest,
        filter: {
            tagIds: {
                items: Array.isArray(tags) ? tags : [tags],
                operator: "or",
            },
            subcategoryIds: {
                items: Array.isArray(subcategoryIds) ? subcategoryIds : [subcategoryIds],
                operator: "or",
            },
        },
    };
};
