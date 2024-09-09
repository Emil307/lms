import { TFunctionParams } from "@shared/ui/DataGrid/types";
import { ArticleAndArticleCategoryFiltersForm, GetMyArticlesRequest } from "@entities/article";

export const adaptGetMyArticlesRequest = (params: TFunctionParams<ArticleAndArticleCategoryFiltersForm>): GetMyArticlesRequest => {
    const { tags = [], subcategoryIds = [], userId, ...rest } = params;

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
            ...(userId && {
                userIds: {
                    items: [userId],
                    operator: "not",
                },
            }),
        },
    };
};
