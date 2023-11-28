import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GetFaqRequest, GetFaqResponse, staticPageApi } from "@entities/staticPage";
import { EntityNames, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";

export const useFaq = (params: GetFaqRequest, enabled?: boolean): UseQueryResult<GetFaqResponse, AxiosError<FormErrorResponse>> => {
    return useQuery([QueryKeys.GET_FAQ, [EntityNames.STATIC_FAQ], params], () => staticPageApi.getFaq(params), { enabled });
};
