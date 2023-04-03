import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { usersApi } from "../api";
import { UsersRequestParamsType } from "../api/types";

export const useUsers = (params: UsersRequestParamsType) => {
    return useQuery(
        [QueryKeys.GET_USERS, params.filters, `${params.page}`, `${params.perPage}`, params.query, params.sorting],
        () => usersApi.getUsers(params),
        { keepPreviousData: true }
    );
};
