import { TFunctionParams } from "@shared/ui/DataGrid/types";
import { TRouterQueries } from "@shared/types";
import { GetGroupsRequest } from "@entities/group";

export const adaptGetGroupsRequest = (params: TFunctionParams<TRouterQueries>): GetGroupsRequest => {
    const { tab, ...rest } = params;

    return {
        ...rest,
        filter: {
            status: tab,
        },
    };
};
