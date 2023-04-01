import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { GetPublicOfferResponse, staticPageApi } from "@entities/staticPage";

export const usePublicOffer = () => {
    return useQuery<GetPublicOfferResponse>([QueryKeys.GET_PUBLIC_OFFER], () => staticPageApi.getPublicOffer());
};
