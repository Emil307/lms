import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { GetAdminTagsRequest, GetAdminTagsResponse, tagApi } from "@entities/tag";
import { FormErrorResponse } from "@shared/types";

export const useAdminTags = (params: GetAdminTagsRequest): UseQueryResult<GetAdminTagsResponse, AxiosError<FormErrorResponse>> => {
    const router = useRouter();
    return useQuery([QueryKeys.GET_ADMIN_TAGS, [EntityNames.TAG], params], () => tagApi.getAdminTags(params), {
        keepPreviousData: true,
        enabled: router.isReady,
    });
};
