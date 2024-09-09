import { ArticlePackagesFiltersForm, GetArticlePackagesRequest } from "@entities/articlePackage";
import { TFunctionParams } from "@shared/ui/DataGrid/types";

export const adaptGetArticlePackagesRequest = (params: TFunctionParams<ArticlePackagesFiltersForm>): GetArticlePackagesRequest => {
    const { courseIds, userId, ...rest } = params;

    return {
        ...rest,
        filter: {
            ...(courseIds && {
                courseIds: String(courseIds),
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
