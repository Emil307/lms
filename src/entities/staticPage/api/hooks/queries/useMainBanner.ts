import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { GetMainBannerResponse, staticPageApi } from "@entities/staticPage";
import { FormErrorResponse } from "@shared/types";

export const useMainBanner = (): UseQueryResult<GetMainBannerResponse, AxiosError<FormErrorResponse>> => {
    return useQuery([QueryKeys.GET_MAIN_BANNER, [EntityNames.STATIC_MAIN_BANNER, EntityNames.USER]], () => staticPageApi.getMainBanner());
};
