import { useQuery } from "@tanstack/react-query";
import { GetFaqRequest, GetFaqResponse, staticPageApi } from "@entities/staticPage";
import { QueryKeys } from "@shared/constant";

export const useFaq = (params: GetFaqRequest, enabled?: boolean) => {
    return useQuery<GetFaqResponse>([QueryKeys.GET_FAQ, params], () => staticPageApi.getFaq(params), { enabled });
};
