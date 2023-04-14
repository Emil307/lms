import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { QueryKeys } from "@shared/constant";
import { GetAdminTagsRequest, tagApi } from "@entities/tag";

export const useAdminTags = (params: GetAdminTagsRequest) => {
    const router = useRouter();
    return useQuery([QueryKeys.GET_ADMIN_TAGS, params], () => tagApi.getAdminTags(params), {
        keepPreviousData: true,
        enabled: router.isReady,
    });
};
