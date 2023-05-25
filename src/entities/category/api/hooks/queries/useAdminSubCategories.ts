import { useQuery } from "@tanstack/react-query";
import { categoryApi, GetAdminSubCategoriesRequest } from "@entities/category";
import { QueryKeys } from "@shared/constant";

export const useAdminSubCategories = (data: GetAdminSubCategoriesRequest) => {
    return useQuery([QueryKeys.GET_ADMIN_SUBCATEGORIES, data.filter.parentId], () => categoryApi.getAdminSubCategories(data), {
        enabled: !!data.filter.parentId,
    });
};
