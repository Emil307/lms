import { TFunctionParams } from "@shared/ui/DataGrid/types";
import { GetStaticUsersRequest, StaticUsersExtraFilters } from "@entities/user";

export const adaptGetStaticUsersRequest = (params: TFunctionParams<unknown, StaticUsersExtraFilters>): GetStaticUsersRequest => {
    const { roleName, ...rest } = params;
    return {
        ...rest,
        filter: {
            roleName,
        },
    };
};
