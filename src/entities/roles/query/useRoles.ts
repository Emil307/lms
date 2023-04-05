import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { rolesApi } from "../api";

export const useRoles = () => {
    return useQuery([QueryKeys.GET_ROLES], () => rolesApi.getRoles());
};
