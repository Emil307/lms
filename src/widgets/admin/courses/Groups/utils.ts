import { GetAdminGroupsRequest } from "@entities/group";
import { TFunctionParams } from "@shared/ui/DataGrid/types";
import { TCourseGroupsExtraParams } from "./types";

export const adaptGetAdminGroupsRequest = (params: TFunctionParams<unknown, TCourseGroupsExtraParams>): GetAdminGroupsRequest => {
    const { courseId, ...rest } = params;

    return {
        ...rest,
        filter: {
            "course.id": courseId,
        },
    };
};
