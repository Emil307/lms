import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { Advantage, staticPageApi } from "@entities/staticPage";

export const useAdvantage = (id: string) => {
    return useQuery<Advantage>([QueryKeys.GET_ADVANTAGE, id], () => staticPageApi.getAdvantage(id));
};
