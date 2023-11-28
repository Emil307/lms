import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GetGroupsRequest, GetGroupsResponse, groupApi } from "@entities/group";
import { EntityNames, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";

export const useGroups = (data: GetGroupsRequest, enabled?: boolean): UseQueryResult<GetGroupsResponse, AxiosError<FormErrorResponse>> => {
    return useQuery(
        [QueryKeys.GET_GROUPS, [EntityNames.GROUP, EntityNames.COURSE, EntityNames.LESSON], data],
        () => groupApi.getGroups(data),
        { enabled }
    );
};
