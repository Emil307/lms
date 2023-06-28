import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { GetAdminAdvantagesResponse, GetAdvantagesRequest, staticPageApi } from "@entities/staticPage";

export const useAdminAdvantages = (params: GetAdvantagesRequest) => {
    return useQuery<GetAdminAdvantagesResponse>([QueryKeys.GET_ADMIN_ADVANTAGES, params], () => staticPageApi.getAdminAdvantages(params));
};
