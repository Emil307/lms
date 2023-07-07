import { TFunctionParams } from "@shared/ui/DataGrid/types";
import { ArticleAndArticleCategoryFiltersForm, GetFavoriteArticlesRequest } from "@entities/article";

export const adaptGetFavoriteArticlesRequest = (
    params: TFunctionParams<ArticleAndArticleCategoryFiltersForm>,
): GetFavoriteArticlesRequest => {
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
