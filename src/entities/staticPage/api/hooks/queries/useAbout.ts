import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { GetAboutResponse, staticPageApi } from "@entities/staticPage";

export const useAbout = () => {
    return useQuery<GetAboutResponse>([QueryKeys.GET_ABOUT], () => staticPageApi.getAbout());
};
