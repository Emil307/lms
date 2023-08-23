import { TFunctionParams } from "@shared/ui/DataGrid/types";
import { GetAdminCoursesRequest } from "@entities/course";
import { StudentCourseListExtraParams } from "./types";

export const adaptGetAdminCoursesRequest = (params: TFunctionParams<unknown, StudentCourseListExtraParams>): GetAdminCoursesRequest => {
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
