import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { GetAdvantagesRequest, GetAdvantagesResponse, staticPageApi } from "@entities/staticPage";

export const useAdvantages = (params: GetAdvantagesRequest) => {
    return useQuery<GetAdvantagesResponse>([QueryKeys.GET_ADVANTAGES, params], () => staticPageApi.getAdvantages(params));
};
