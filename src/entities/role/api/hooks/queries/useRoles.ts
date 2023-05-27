import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { roleApi } from "@entities/role";

export const useRoles = () => {
    return useQuery([QueryKeys.GET_ROLES], () => roleApi.getRoles());
};
