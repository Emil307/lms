import { TFunctionParams } from "@shared/ui/DataGrid/types";
import { AdminCourseStudentsRequestExtraFilter, GetAdminCourseStudentsRequest } from "@entities/course";

export const adaptGetAdminStudentsRequest = (
    params: TFunctionParams<unknown, AdminCourseStudentsRequestExtraFilter>
): GetAdminCourseStudentsRequest => {
    const { attachableToCourse, ...rest } = params;

    return {
        ...rest,
        filter: {
            attachableToCourse,
        },
    };
};
