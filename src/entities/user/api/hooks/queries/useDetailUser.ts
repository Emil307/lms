import { useQuery } from "@tanstack/react-query";
import { userApi } from "@entities/user";
import { QueryKeys } from "@shared/constant";

export const useDetailUser = (id: string) => {
    return useQuery([QueryKeys.GET_USER, id], () => userApi.showUser(id), {
        enabled: !!id,
    });
};
