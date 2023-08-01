import { TFunctionParams } from "@shared/ui/DataGrid/types";
import { GetAdminCoursesRequest } from "@entities/course";
import { TeacherCourseListExtraParams } from "./types";

export const adaptGetTeacherCoursesRequest = (params: TFunctionParams<unknown, TeacherCourseListExtraParams>): GetAdminCoursesRequest => {
    const { teacherId, ...rest } = params;

    return {
        ...rest,
        filter: {
            teacherIds: {
                items: [teacherId],
                operator: "or",
            },
        },
    };
};
