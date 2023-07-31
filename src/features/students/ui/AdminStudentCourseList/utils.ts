import { AdminStudentCoursesExtraFilters, GetAdminCoursesRequest } from "@entities/course";
import { TFunctionParams } from "@shared/ui/DataGrid/types";

export const adaptGetStudentCoursesRequest = (
    params: TFunctionParams<unknown, AdminStudentCoursesExtraFilters>
): GetAdminCoursesRequest => {
    const { studentId, ...rest } = params;

    return {
        ...rest,
        filter: {
            studentIds: studentId,
        },
    };
};
