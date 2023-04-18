import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { QueryKeys } from "@shared/constant";
import { usersApi, UsersRequestParamsType } from "@entities/user";

export const useUsers = (params: UsersRequestParamsType) => {
    const router = useRouter();
    return useQuery(
        [QueryKeys.GET_USERS, params.isActive, params.roleName, params.query, params.page, params.perPage, params.sort],
        () => usersApi.getUsers(params),
        { keepPreviousData: true, enabled: router.isReady }
    );
};
