import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { GetPublicOfferResponse, staticPageApi } from "@entities/staticPage";
import { FormErrorResponse } from "@shared/types";

export const usePublicOffer = (): UseQueryResult<GetPublicOfferResponse, AxiosError<FormErrorResponse>> => {
    return useQuery([QueryKeys.GET_PUBLIC_OFFER, [EntityNames.STATIC_PUBLIC_OFFER, EntityNames.USER]], () =>
        staticPageApi.getPublicOffer()
    );
};
