import { TFunctionParams } from "@shared/ui/DataGrid/types";
import { AdminCoursesForCoursePackageFiltersForm, GetAdminCoursesRequest } from "@entities/course";
import { AdminCoursesFromCourseCollectionExtraFilters } from "@entities/courseCollection";

export const adaptGetAdminCoursesRequest = (
    params: TFunctionParams<AdminCoursesForCoursePackageFiltersForm, AdminCoursesFromCourseCollectionExtraFilters>
): GetAdminCoursesRequest => {
    const { tags = [], categoryId, subcategoryId, collectionIds, ...rest } = params;

    return {
        ...rest,
        filter: {
            isActive: true,
            "category.id": categoryId,
            "subcategory.id": subcategoryId,
            tagIds: {
                items: tags,
                operator: "or",
            },
            ...(collectionIds && {
                collectionIds: {
                    items: [collectionIds],
                    operator: "not",
                },
            }),
        },
    };
};
