import { TFunctionParams } from "@shared/ui/DataGrid/types";
import {
    AdminArticleFromArticlePackageExtraFilters,
    AdminArticleFromArticlePackageFiltersForm,
    GetAdminArticlesRequest,
} from "@entities/article";

export const adaptGetAdminArticlesRequest = (
    params: TFunctionParams<AdminArticleFromArticlePackageFiltersForm, AdminArticleFromArticlePackageExtraFilters>
): GetAdminArticlesRequest => {
    const { categoryId, subcategoryId, articlePackageIds, ...rest } = params;

    return {
        ...rest,
        filter: {
            articlePackageIds: {
                items: [articlePackageIds],
                operator: "not",
            },
            "category.id": categoryId,
            subcategoryIds: subcategoryId,
        },
    };
};
