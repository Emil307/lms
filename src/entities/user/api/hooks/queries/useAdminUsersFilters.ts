import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { userApi } from "@entities/user";

export const useAdminUsersFilters = () => {
    return useQuery([QueryKeys.GET_ADMIN_USERS_FILTERS], () => userApi.getAdminUsersFilters());
};
