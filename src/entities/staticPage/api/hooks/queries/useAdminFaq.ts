import { useQuery } from "@tanstack/react-query";
import { GetAdminFaqResponse, staticPageApi } from "@entities/staticPage";
import { QueryKeys } from "@shared/constant";

export const useAdminFaq = () => {
    return useQuery<GetAdminFaqResponse>([QueryKeys.GET_ADMIN_FAQ], () => staticPageApi.getAdminFaq());
};
