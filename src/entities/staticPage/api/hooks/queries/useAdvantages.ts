import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { GetAdvantagesRequest, GetAdvantagesResponse, staticPageApi } from "@entities/staticPage";
import { FormErrorResponse } from "@shared/types";

export const useAdvantages = (params: GetAdvantagesRequest): UseQueryResult<GetAdvantagesResponse, AxiosError<FormErrorResponse>> => {
    return useQuery([QueryKeys.GET_ADVANTAGES, [EntityNames.STATIC_ADVANTAGE], params], () => staticPageApi.getAdvantages(params));
};
