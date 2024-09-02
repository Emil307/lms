import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { GetAdminStudentsFiltersResponse, userApi } from "@entities/user";
import { FormErrorResponse } from "@shared/types";

export const useAdminStudentsFilters = (): UseQueryResult<GetAdminStudentsFiltersResponse, AxiosError<FormErrorResponse>> => {
    return useQuery([QueryKeys.GET_ADMIN_STUDENTS_FILTERS, [EntityNames.STUDENT]], () => userApi.getAdminStudentsFilters());
};
