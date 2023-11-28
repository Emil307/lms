import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { GetUsersAdminFiltersResponse, userApi } from "@entities/user";
import { FormErrorResponse } from "@shared/types";

export const useAdminUsersFilters = (): UseQueryResult<GetUsersAdminFiltersResponse, AxiosError<FormErrorResponse>> => {
    return useQuery([QueryKeys.GET_ADMIN_USERS_FILTERS, [EntityNames.USER]], () => userApi.getAdminUsersFilters());
};
