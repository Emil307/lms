import { TFunctionParams } from "@shared/ui/DataGrid/types";
import {
    AdminArticleCoursesExtraFilters,
    AdminCoursesNoIncludedArticleFiltersForm,
    GetAdminCoursesNoIncludedArticleRequest,
} from "@entities/course";

export const adaptGetAdminCoursesRequest = (
    params: TFunctionParams<AdminCoursesNoIncludedArticleFiltersForm, AdminArticleCoursesExtraFilters>
): GetAdminCoursesNoIncludedArticleRequest => {
    const { categoryId, subcategoryId, articleId, tagIds = [], ...rest } = params;

    //TODO: заюзать articleId как бек добавить фильтрацию

    return {
        ...rest,
        filter: {
            "category.id": categoryId,
            "subcategory.id": subcategoryId,

            tagIds: {
                items: tagIds,
                operator: "or",
            },
        },
    };
};
