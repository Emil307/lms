import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { GetAdminGroupFiltersRequest, GetAdminGroupFiltersResponse, groupApi } from "@entities/group";

export const useAdminGroupFilters = (data: GetAdminGroupFiltersRequest) => {
    return useQuery<GetAdminGroupFiltersResponse>([QueryKeys.GET_ADMIN_GROUP_FILTERS, data], () => groupApi.getAdminGroupFilters(data));
};
