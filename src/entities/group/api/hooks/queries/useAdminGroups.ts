import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { GetAdminGroupsRequest, groupApi } from "@entities/group";
import { QueryKeys } from "@shared/constant";

export const useAdminGroups = (params: GetAdminGroupsRequest) => {
    const router = useRouter();
    return useQuery([QueryKeys.GET_ADMIN_GROUPS, params], () => groupApi.getAdminGroups(params), {
        keepPreviousData: true,
        enabled: router.isReady,
        refetchOnMount: true,
    });
};
