import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { QueryKeys } from "@shared/constant";
import { userApi, UsersRequestParamsType } from "@entities/user";

export const useAdminUsers = (params: UsersRequestParamsType) => {
    const router = useRouter();
    return useQuery(
        [QueryKeys.GET_USERS, params.page, params.perPage, params.sort, params.query, params.roleName, params.isActive],
        () => userApi.getAdminUsers(params),
        { keepPreviousData: true, enabled: router.isReady }
    );
};
