import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GetAdminGroupRequest, GetAdminGroupResponse, groupApi } from "@entities/group";
import { EntityNames, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";

export const useAdminGroup = ({ id }: GetAdminGroupRequest): UseQueryResult<GetAdminGroupResponse, AxiosError<FormErrorResponse>> => {
    return useQuery(
        [QueryKeys.GET_ADMIN_GROUP, [EntityNames.GROUP, EntityNames.COURSE, EntityNames.USER, EntityNames.STUDENT], id],
        () => groupApi.getAdminGroup({ id }),
        {
            enabled: !!id,
        }
    );
};
