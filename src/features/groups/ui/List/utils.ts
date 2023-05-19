import { GetAdminGroupsRequest, GroupsListFilters } from "@entities/group";
import { TFunctionParams } from "@shared/ui/DataGrid/types";

export const adaptGetAdminGroupsRequest = (params: TFunctionParams<GroupsListFilters>): GetAdminGroupsRequest => {
    const { isActive, ...rest } = params;

    return {
        ...rest,
        filter: {
            isActive,
        },
    };
};
