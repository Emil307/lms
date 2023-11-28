import { GetGroupModulesRequest, GroupModuleFromList, groupApi } from "@entities/group";
import { EntityNames, QueryKeys } from "@shared/constant";
import { useInfiniteRequest } from "@shared/utils";

export const useGroupModules = (data: Omit<GetGroupModulesRequest, "page">) => {
    return useInfiniteRequest<GroupModuleFromList>(
        [QueryKeys.GET_GROUP_MODULES, [EntityNames.GROUP, EntityNames.COURSE_MODULE, EntityNames.LESSON], data],
        ({ pageParam = 1 }) => groupApi.getGroupModules({ ...data, page: pageParam })
    );
};
