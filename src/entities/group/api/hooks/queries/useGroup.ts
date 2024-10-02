import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GetGroupRequest, GetGroupResponse, groupApi } from "@entities/group";
import { EntityNames, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";

export const useGroup = ({ id }: GetGroupRequest): UseQueryResult<GetGroupResponse, AxiosError<FormErrorResponse>> => {
    return useQuery(
        [QueryKeys.GET_GROUP, [EntityNames.GROUP, EntityNames.COURSE, EntityNames.LESSON, EntityNames.CATEGORY, EntityNames.TAG], id],
        () => groupApi.getGroup({ id }),
        {
            enabled: !!id,
        }
    );
};
