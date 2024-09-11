import { TFunctionParams } from "@shared/ui/DataGrid/types";
import { ArticleAndArticleCategoryFiltersForm, GetFavoriteArticlesRequest } from "@entities/article";

export const adaptGetFavoriteArticlesRequest = (
    params: TFunctionParams<ArticleAndArticleCategoryFiltersForm>
): GetFavoriteArticlesRequest => {
    const { tags = [], subcategoryIds = [], ...rest } = params;

    return {
        ...rest,
        filter: {
            ...(tags.length > 0 && {
                tagIds: {
                    items: Array.isArray(tags) ? tags : [tags],
                    operator: "or",
                },
            }),
            ...(subcategoryIds.length > 0 && {
                subcategoryIds: {
                    items: Array.isArray(subcategoryIds) ? subcategoryIds : [subcategoryIds],
                    operator: "or",
                },
            }),
        },
    };
};
