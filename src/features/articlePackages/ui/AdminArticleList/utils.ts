import { TFunctionParams } from "@shared/ui/DataGrid/types";
import { GetAdminArticlesRequest } from "@entities/article";
import { AdminArticlesFromArticlePackageExtraFilters } from "@entities/articlePackage";

export const adaptGetAdminArticlesRequest = (
    params: TFunctionParams<unknown, AdminArticlesFromArticlePackageExtraFilters>
): GetAdminArticlesRequest => {
    const { articlePackageIds, ...rest } = params;

    return {
        ...rest,
        filter: {
            articlePackageIds,
        },
    };
};
