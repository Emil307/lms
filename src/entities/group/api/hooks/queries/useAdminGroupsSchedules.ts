import { useInfiniteRequest } from "@shared/utils";
import { QueryKeys } from "@shared/constant";
import { AdminGroupSchedulesInfo, GetAdminGroupSchedulesInfoRequest, groupApi } from "@entities/group";

export const useAdminGroupsSchedules = (params: GetAdminGroupSchedulesInfoRequest) => {
    return useInfiniteRequest<AdminGroupSchedulesInfo>([QueryKeys.GET_ADMIN_GROUPS_SCHEDULES, params], ({ pageParam = 1 }) =>
        groupApi.getAdminGroupsSchedules({ ...params, page: pageParam })
    );
};
