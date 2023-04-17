import { GetGroupSchedulesRequest, groupApi, ScheduleLine } from "@entities/group";
import { QueryKeys } from "@shared/constant";
import { useInfiniteRequest } from "@shared/utils";

export const useGroupSchedules = (filters: GetGroupSchedulesRequest) => {
    return useInfiniteRequest<ScheduleLine>([QueryKeys.GET_GROUP_SCHEDULES, filters], () => groupApi.getGroupSchedules(filters));
};
