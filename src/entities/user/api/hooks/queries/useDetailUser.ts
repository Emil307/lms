import { useQuery } from "@tanstack/react-query";
import { usersApi } from "@entities/user";
import { QueryKeys } from "@shared/constant";

export const useDetailUser = (id: string) => {
    return useQuery([QueryKeys.GET_USER, id], () => usersApi.showUser(id), {
        enabled: !!id,
    });
};
