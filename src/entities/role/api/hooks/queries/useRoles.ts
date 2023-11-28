import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { QueryKeys } from "@shared/constant";
import { GetRolesResponse, roleApi } from "@entities/role";
import { FormErrorResponse } from "@shared/types";

export const useRoles = (): UseQueryResult<GetRolesResponse, AxiosError<FormErrorResponse>> => {
    return useQuery([QueryKeys.GET_ROLES], () => roleApi.getRoles());
};
