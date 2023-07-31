import { useQuery } from "@tanstack/react-query";
import { GetGroupsRequest, groupApi } from "@entities/group";
import { QueryKeys } from "@shared/constant";

export const useGroups = (data: GetGroupsRequest, enabled?: boolean) => {
    return useQuery([QueryKeys.GET_GROUPS, data], () => groupApi.getGroups(data), { enabled });
};
