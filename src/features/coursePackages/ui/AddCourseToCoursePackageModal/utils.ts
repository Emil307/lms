import { TFunctionParams } from "@shared/ui/DataGrid/types";
import { AdminCoursesForCoursePackageFiltersForm, GetAdminCoursesWithoutCoursesFromCoursePackageRequest } from "@entities/course";
import { AdminCourseFromCoursePackageFilters } from "@entities/coursePackage";

export const adaptGetAdminCoursesRequest = (
    params: TFunctionParams<AdminCoursesForCoursePackageFiltersForm, AdminCourseFromCoursePackageFilters>
): GetAdminCoursesWithoutCoursesFromCoursePackageRequest => {
    const { tags = [], categoryId, subcategoryId, coursePackageId, ...rest } = params;

    return {
        ...rest,
        filter: {
            isActive: true,
            "category.id": categoryId,
            "subcategory.id": subcategoryId,
            tags: {
                items: tags,
                operator: "or",
            },
            ...(coursePackageId && {
                packageIds: {
                    items: [coursePackageId],
                    operator: "not",
                },
            }),
        },
    };
};
