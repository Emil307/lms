import { groupApi, GroupSchedulesFilters, ScheduleLine } from "@entities/group";
import { QueryKeys } from "@shared/constant";
import { useInfiniteRequest } from "@shared/utils";

export const useGroupSchedules = (filters: GroupSchedulesFilters) => {
    return useInfiniteRequest<ScheduleLine>([QueryKeys.GET_GROUP_SCHEDULES, filters], () => groupApi.getGroupSchedules(filters));
};
