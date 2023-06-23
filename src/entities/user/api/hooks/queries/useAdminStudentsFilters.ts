import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { userApi } from "@entities/user";

export const useAdminStudentsFilters = () => {
    return useQuery([QueryKeys.GET_ADMIN_STUDENTS_FILTERS], () => userApi.getAdminStudentsFilters());
};
