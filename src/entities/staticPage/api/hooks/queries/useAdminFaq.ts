import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GetAdminFaqResponse, staticPageApi } from "@entities/staticPage";
import { EntityNames, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";

export const useAdminFaq = (): UseQueryResult<GetAdminFaqResponse, AxiosError<FormErrorResponse>> => {
    return useQuery([QueryKeys.GET_ADMIN_FAQ, [EntityNames.STATIC_FAQ, EntityNames.USER]], () => staticPageApi.getAdminFaq());
};
