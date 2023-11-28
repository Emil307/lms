import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { GetAboutResponse, staticPageApi } from "@entities/staticPage";
import { FormErrorResponse } from "@shared/types";

export const useAbout = (): UseQueryResult<GetAboutResponse, AxiosError<FormErrorResponse>> => {
    return useQuery([QueryKeys.GET_ABOUT, [EntityNames.STATIC_ABOUT, EntityNames.USER]], () => staticPageApi.getAbout());
};
