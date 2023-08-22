import { TFunctionParams } from "@shared/ui/DataGrid/types";
import { AdminArticleFromCourseExtraFilters, AdminArticleFromCourseFiltersForm, GetAdminArticlesRequest } from "@entities/article";

export const adaptGetAdminArticlesRequest = (
    params: TFunctionParams<AdminArticleFromCourseFiltersForm, AdminArticleFromCourseExtraFilters>
): GetAdminArticlesRequest => {
    const { categoryId, subcategoryId, courseId, ...rest } = params;

    return {
        ...rest,
        filter: {
            courseIds: {
                items: [courseId],
                operator: "not",
            },
            "category.id": categoryId,
            subcategoryIds: subcategoryId,
        },
    };
};
