import { ArticlePackagesFiltersForm, GetArticlePackagesRequest } from "@entities/articlePackage";
import { TFunctionParams } from "@shared/ui/DataGrid/types";

export const adaptGetArticlePackagesRequest = (params: TFunctionParams<ArticlePackagesFiltersForm>): GetArticlePackagesRequest => {
    const { courseIds, ...rest } = params;

    return {
        ...rest,
        filter: {
            ...(courseIds && {
                courseIds: String(courseIds),
            }),
        },
    };
};
