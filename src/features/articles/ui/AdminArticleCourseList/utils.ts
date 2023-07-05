import { GetAdminCoursesRequest } from "@entities/course";
import { AdminArticleMaterialsExtraFilters } from "@entities/storage";
import { TFunctionParams } from "@shared/ui/DataGrid/types";

export const adaptGetArticleCoursesRequest = (
    params: TFunctionParams<unknown, AdminArticleMaterialsExtraFilters>
): GetAdminCoursesRequest => {
    const { articleId, ...rest } = params;

    return {
        ...rest,
        filter: {
            articleIds: articleId,
        },
    };
};
