import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { usersApi } from "../api";

export const useAdministratorsUsersFilters = () => {
    return useQuery([QueryKeys.GET_ADMIN_USERS_FILTERS], () => usersApi.getAdministratorsUsersFilters());
};
