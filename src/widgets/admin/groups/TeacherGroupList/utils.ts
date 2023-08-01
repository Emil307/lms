import { TFunctionParams } from "@shared/ui/DataGrid/types";
import { GetAdminGroupsRequest } from "@entities/group";
import { TeacherGroupListExtraParams } from "./types";

export const adaptGetTeacherGroupsRequest = (params: TFunctionParams<unknown, TeacherGroupListExtraParams>): GetAdminGroupsRequest => {
    const { teacherId, ...rest } = params;

    return {
        ...rest,
        filter: {
            "teacher.id": teacherId,
        },
    };
};
