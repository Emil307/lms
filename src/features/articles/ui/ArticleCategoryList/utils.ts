import { TFunctionParams } from "@shared/ui/DataGrid/types";
import { ArticleAndArticleCategoryFiltersForm, GetArticleCategoriesRequest } from "@entities/article";

export const adaptGetArticleCategoriesRequest = (
    params: TFunctionParams<ArticleAndArticleCategoryFiltersForm>
): GetArticleCategoriesRequest => {
    const { tags = [], subcategoryIds = [], ...rest } = params;

    const filter: any = {};

    if (tags.length > 0) {
        filter.tagIds = {
            items: Array.isArray(tags) ? tags : [tags],
            operator: "or",
        };
    }

    if (subcategoryIds.length > 0) {
        filter.subcategoryIds = {
            items: Array.isArray(subcategoryIds) ? subcategoryIds : [subcategoryIds],
            operator: "or",
        };
    }

    return {
        ...rest,
        filter: Object.keys(filter).length > 0 ? filter : {},
    };
};
