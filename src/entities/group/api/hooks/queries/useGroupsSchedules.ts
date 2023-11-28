import { useInfiniteRequest } from "@shared/utils";
import { EntityNames, QueryKeys } from "@shared/constant";
import { GetGroupsSchedulesInfoRequest, groupApi, GroupSchedulesInfo } from "@entities/group";

export const useGroupsSchedules = (params: GetGroupsSchedulesInfoRequest) => {
    return useInfiniteRequest<GroupSchedulesInfo>(
        [QueryKeys.GET_GROUPS_SCHEDULES, [EntityNames.GROUP, EntityNames.COURSE], params],
        ({ pageParam = 1 }) => groupApi.getGroupsSchedules({ ...params, page: pageParam })
    );
};
