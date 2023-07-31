import { useQuery } from "@tanstack/react-query";
import { GetGroupsCountsResponse, groupApi } from "@entities/group";
import { QueryKeys } from "@shared/constant";

export const useGroupsCounts = () => {
    return useQuery<GetGroupsCountsResponse>([QueryKeys.GET_GROUPS_COUNTS], () => groupApi.getGroupsCounts());
};
