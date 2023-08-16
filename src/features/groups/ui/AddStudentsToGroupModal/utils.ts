import { TFunctionParams } from "@shared/ui/DataGrid/types";
import { GetAdminStudentsRequest } from "@entities/user";
import { AdminAddGroupStudentsExtraFilters } from "@entities/group";

export const adaptGetAdminStudentsRequest = (
    params: TFunctionParams<unknown, AdminAddGroupStudentsExtraFilters>
): GetAdminStudentsRequest => {
    const { groupId, courseId, ...rest } = params;

    return {
        ...rest,
        filter: {
            studentCourseIds: courseId,
            studentGroupIds: {
                items: [groupId],
                operator: "not",
            },
        },
    };
};
