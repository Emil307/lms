import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UserDetailResponse, userApi } from "@entities/user";
import { EntityNames, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";

export const useDetailsStudent = (id: string): UseQueryResult<UserDetailResponse, AxiosError<FormErrorResponse>> => {
    return useQuery([QueryKeys.GET_ADMIN_STUDENT, [EntityNames.STUDENT], id], () => userApi.showUser(id), {
        enabled: !!id,
    });
};
