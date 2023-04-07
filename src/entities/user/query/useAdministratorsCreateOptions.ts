import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { usersApi } from "../api";

export const useAdministratorsCreateOptions = () => {
    return useQuery([QueryKeys.GET_ADMIN_USERS_CREATE_OPTIONS], () => usersApi.getUsersAdministratorsCreateOptions());
};
