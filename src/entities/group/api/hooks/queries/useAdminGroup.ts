import { useQuery } from "@tanstack/react-query";
import { GetAdminGroupRequest, GetAdminGroupResponse, groupApi } from "@entities/group";
import { QueryKeys } from "@shared/constant";

export const useAdminGroup = ({ id }: GetAdminGroupRequest) => {
    return useQuery<GetAdminGroupResponse>([QueryKeys.GET_ADMIN_GROUP, id], () => groupApi.getAdminGroup({ id }), {
        enabled: !!id,
    });
};
