import { useQuery } from "@tanstack/react-query";
import { GetGroupRequest, GetGroupResponse, groupApi } from "@entities/group";
import { QueryKeys } from "@shared/constant";

export const useGroup = ({ id }: GetGroupRequest) => {
    return useQuery<GetGroupResponse>([QueryKeys.GET_GROUP, id], () => groupApi.getGroup({ id }), {
        enabled: !!id,
    });
};
