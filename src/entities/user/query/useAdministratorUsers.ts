import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { QueryKeys } from "@shared/constant";
import { usersApi } from "../api";
import { UsersRequestParamsType } from "../api/types";

export const useAdministratorUsers = (params: UsersRequestParamsType) => {
    const router = useRouter();
    return useQuery(
        [QueryKeys.GET_USERS, params.filters, `${params.page}`, `${params.perPage}`, params.query, params.sorting],
        () => usersApi.getAdministratorUsers(params),
        { keepPreviousData: true, enabled: router.isReady }
    );
};
