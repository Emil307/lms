import { TFunctionParams } from "@shared/ui/DataGrid/types";
import { GetAdminCoursesRequest } from "@entities/course";
import { AdminCourseFromCoursePackageFilters } from "@entities/coursePackage";

export const adaptGetAdminCoursesRequest = (
    params: TFunctionParams<unknown, AdminCourseFromCoursePackageFilters>,
): GetAdminCoursesRequest => {
    const { coursePackageId, ...rest } = params;

    return {
        ...rest,
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
