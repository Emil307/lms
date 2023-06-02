import { TFunctionParams } from "@shared/ui/DataGrid/types";
import {
    AdminArticleFromArticlePackageExtraFilters,
    AdminArticleFromArticlePackageFiltersForm,
    GetAdminArticlesNoIncludedArticlePackageRequest,
} from "@entities/article";

export const adaptGetAdminArticlesRequest = (
    params: TFunctionParams<AdminArticleFromArticlePackageFiltersForm, AdminArticleFromArticlePackageExtraFilters>
): GetAdminArticlesNoIncludedArticlePackageRequest => {
    const { categoryId, subcategoryId, articlePackageIds, ...rest } = params;

    return {
        ...rest,
        filter: {
            articlePackageIds: {
                items: [articlePackageIds],
                operator: "not",
            },
            "category.id": categoryId,
            "subcategory.id": subcategoryId,
        },
    };
};
