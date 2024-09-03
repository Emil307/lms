import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { Advantage, staticPageApi } from "@entities/staticPage";
import { FormErrorResponse } from "@shared/types";

export const useAdvantage = (id: number): UseQueryResult<Advantage, AxiosError<FormErrorResponse>> => {
    return useQuery([QueryKeys.GET_ADVANTAGE, [EntityNames.STATIC_ADVANTAGE], id], () => staticPageApi.getAdvantage(id));
};
