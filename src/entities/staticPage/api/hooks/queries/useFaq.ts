import { useQuery } from "@tanstack/react-query";
import { GetFaqResponse, staticPageApi } from "@entities/staticPage";
import { QueryKeys } from "@shared/constant";

export const useFaq = () => {
    return useQuery<GetFaqResponse>([QueryKeys.GET_FAQ], () => staticPageApi.getFaq());
};
