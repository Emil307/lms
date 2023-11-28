import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UserDetailResponse, userApi } from "@entities/user";
import { EntityNames, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";

export const useDetailsUser = (id: string): UseQueryResult<UserDetailResponse, AxiosError<FormErrorResponse>> => {
    return useQuery([QueryKeys.GET_ADMIN_USER, [EntityNames.USER], id], () => userApi.showUser(id), {
        enabled: !!id,
    });
};
