import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { GetAdminGroupFiltersRequest, GetAdminGroupFiltersResponse, groupApi } from "@entities/group";
import { FormErrorResponse } from "@shared/types";

export const useAdminGroupFilters = (
    data: GetAdminGroupFiltersRequest
): UseQueryResult<GetAdminGroupFiltersResponse, AxiosError<FormErrorResponse>> => {
    return useQuery([QueryKeys.GET_ADMIN_GROUP_FILTERS, [EntityNames.GROUP, EntityNames.COURSE, EntityNames.USER], data], () =>
        groupApi.getAdminGroupFilters(data)
    );
};
