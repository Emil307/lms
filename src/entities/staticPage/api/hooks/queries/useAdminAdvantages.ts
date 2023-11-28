import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { GetAdminAdvantagesResponse, GetAdvantagesRequest, staticPageApi } from "@entities/staticPage";
import { FormErrorResponse } from "@shared/types";

export const useAdminAdvantages = (
    params: GetAdvantagesRequest
): UseQueryResult<GetAdminAdvantagesResponse, AxiosError<FormErrorResponse>> => {
    return useQuery([QueryKeys.GET_ADMIN_ADVANTAGES, [EntityNames.STATIC_ADVANTAGE, EntityNames.USER], params], () =>
        staticPageApi.getAdminAdvantages(params)
    );
};
