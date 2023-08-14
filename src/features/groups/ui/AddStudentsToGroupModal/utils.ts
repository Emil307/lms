import { TFunctionParams } from "@shared/ui/DataGrid/types";
import { GetAdminStudentsRequest } from "@entities/user";
import { AdminGroupStudentsExtraFilters } from "@entities/group";

export const adaptGetAdminStudentsRequest = (params: TFunctionParams<unknown, AdminGroupStudentsExtraFilters>): GetAdminStudentsRequest => {
    const { groupId, ...rest } = params;

    return {
        ...rest,
        filter: {
            studentGroupIds: {
                items: [groupId],
                operator: "not",
            },
        },
    };
};
