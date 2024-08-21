import { TFunctionParams } from "@shared/ui/DataGrid/types";
import { AdminArticleCoursesExtraFilters, AdminCoursesNoIncludedArticleFiltersForm, GetAdminCoursesRequest } from "@entities/course";

export const adaptGetAdminCoursesRequest = (
    params: TFunctionParams<AdminCoursesNoIncludedArticleFiltersForm, AdminArticleCoursesExtraFilters>
): GetAdminCoursesRequest => {
    const { categoryId, subcategoryId, articleId, tagIds = [], ...rest } = params;

    return <GetAdminCoursesRequest>{
        ...rest,
        filter: {
            "category.id": categoryId,
            "subcategory.id": subcategoryId,

            tagIds: {
                items: tagIds,
                operator: "or",
            },
            articleIds: {
                items: [articleId],
                operator: "not",
            },
        },
    };
};
