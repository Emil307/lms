import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { GetMainBannerResponse, staticPageApi } from "@entities/staticPage";

export const useMainBanner = () => {
    return useQuery<GetMainBannerResponse>([QueryKeys.GET_MAIN_BANNER], () => staticPageApi.getMainBanner());
};
