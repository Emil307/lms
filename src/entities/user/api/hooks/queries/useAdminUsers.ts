import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { QueryKeys } from "@shared/constant";
import { usersApi, UsersRequestParamsType } from "@entities/user";

export const useAdminUsers = (params: UsersRequestParamsType) => {
    const router = useRouter();
    return useQuery(
        [QueryKeys.GET_USERS, params.filters, `${params.page}`, `${params.perPage}`, params.query, params.sorting],
        () => usersApi.getAdminUsers(params),
        { keepPreviousData: true, enabled: router.isReady }
    );
};