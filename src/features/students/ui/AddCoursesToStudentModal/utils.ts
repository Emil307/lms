import { TFunctionParams } from "@shared/ui/DataGrid/types";
import { AdminStudentCoursesExtraFilters, GetAdminCoursesRequest } from "@entities/course";

export const adaptGetAdminCoursesRequest = (params: TFunctionParams<unknown, AdminStudentCoursesExtraFilters>): GetAdminCoursesRequest => {
    const { studentId, ...rest } = params;

    return {
        ...rest,
        filter: {
            studentIds: {
                items: [studentId],
                operator: "not",
            },
        },
    };
};
