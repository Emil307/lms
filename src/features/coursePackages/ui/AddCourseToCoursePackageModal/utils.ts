import { TFunctionParams } from "@shared/ui/DataGrid/types";
import {
    AdminCoursesForCoursePackageFiltersForm,
    GetAdminCoursesRequest,
    GetAdminCoursesWithoutCoursesFromCoursePackageRequest,
} from "@entities/course";
import { AdminCourseFromCoursePackageFilters } from "@entities/coursePackage";

export const adaptGetAdminCoursesRequest = (
    params: TFunctionParams<AdminCoursesForCoursePackageFiltersForm, AdminCourseFromCoursePackageFilters>
): GetAdminCoursesWithoutCoursesFromCoursePackageRequest => {
    const { tags = [], categoryId, subcategoryId, coursePackageId, ...rest } = params;

    return {
        ...rest,
        filter: {
            isActive: "1",
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

export const adaptGetAdminCoursesFromCoursePackageRequest = (
    params: TFunctionParams<{ coursePackageId: string }>
): GetAdminCoursesRequest => {
    const { coursePackageId, ...rest } = params;
    return {
        ...rest,
        paginate: false,
        filter: {
            ...(coursePackageId && {
                packageIds: {
                    items: [coursePackageId],
                    operator: "or",
                },
            }),
        },
    };
};
