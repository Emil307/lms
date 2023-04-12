import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { groupApi } from "@entities/group";
import { QueryKeys } from "@shared/constant";

export const useAdminGroup = (groupId: string) => {
    const router = useRouter();
    return useQuery([QueryKeys.GET_ADMIN_GROUP, groupId], () => groupApi.getAdminGroup(groupId), {
        keepPreviousData: true,
        enabled: router.isReady,
    });
};
