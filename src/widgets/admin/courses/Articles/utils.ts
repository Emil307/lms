import { TFunctionParams } from "@shared/ui/DataGrid/types";
import { AdminCourseArticleExtraFilters, GetAdminArticlesRequest } from "@entities/article";

export const adaptGetAdminCourseArticlesRequest = (
    params: TFunctionParams<unknown, AdminCourseArticleExtraFilters>
): GetAdminArticlesRequest => {
    const { courseId, ...rest } = params;

    return {
        ...rest,
        filter: {
            courseIds: courseId,
        },
    };
};
