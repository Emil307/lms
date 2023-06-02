import { TFunctionParams } from "@shared/ui/DataGrid/types";
import { ArticleFiltersForm, GetArticlesRequest } from "@entities/article";

export const adaptGetArticlesRequest = (params: TFunctionParams<ArticleFiltersForm>): GetArticlesRequest => {
    const { categoryId, articlePackageIds, ...rest } = params;

    return {
        ...rest,
        filter: {},
    };
};
