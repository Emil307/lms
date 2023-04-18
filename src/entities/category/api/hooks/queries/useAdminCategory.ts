import { useQuery } from "@tanstack/react-query";
import { categoryApi } from "@entities/category";
import { QueryKeys } from "@shared/constant";

export const useAdminCategory = (categoryId?: string) => {
    return useQuery([QueryKeys.GET_ADMIN_CATEGORY, categoryId], () => categoryApi.getAdminCategory(categoryId), { enabled: !!categoryId });
};
