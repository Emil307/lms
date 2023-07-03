import { TFunctionParams } from "@shared/ui/DataGrid/types";
import { ArticleAndArticleCategoryFiltersForm, GetMyArticlesRequest } from "@entities/article";

export const adaptGetMyArticlesRequest = (params: TFunctionParams<ArticleAndArticleCategoryFiltersForm>): GetMyArticlesRequest => {
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
