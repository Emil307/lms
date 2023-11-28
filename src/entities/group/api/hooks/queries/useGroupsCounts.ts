import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GetGroupsCountsResponse, groupApi } from "@entities/group";
import { EntityNames, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";

export const useGroupsCounts = (): UseQueryResult<GetGroupsCountsResponse, AxiosError<FormErrorResponse>> => {
    return useQuery([QueryKeys.GET_GROUPS_COUNTS, [EntityNames.GROUP]], () => groupApi.getGroupsCounts());
};
