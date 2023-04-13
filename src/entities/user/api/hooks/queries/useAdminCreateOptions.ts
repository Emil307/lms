import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { usersApi } from "@entities/user";

export const useAdminCreateOptions = () => {
    return useQuery([QueryKeys.GET_ADMIN_USERS_CREATE_OPTIONS], () => usersApi.getUsersAdminCreateOptions());
};
