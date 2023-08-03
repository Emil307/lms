import { GetGroupModulesRequest, GroupModuleFromList, groupApi } from "@entities/group";
import { QueryKeys } from "@shared/constant";
import { useInfiniteRequest } from "@shared/utils";

export const useGroupModules = (data: Omit<GetGroupModulesRequest, "page">) => {
    return useInfiniteRequest<GroupModuleFromList>([QueryKeys.GET_GROUP_MODULES, data], ({ pageParam = 1 }) =>
        groupApi.getGroupModules({ ...data, page: pageParam })
    );
};
