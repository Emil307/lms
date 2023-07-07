import { useQuery } from "@tanstack/react-query";
import { categoryApi, GetAdminSubCategoriesRequest, GetAdminSubCategoriesResponse } from "@entities/category";
import { QueryKeys } from "@shared/constant";

export const useAdminSubCategories = (data: GetAdminSubCategoriesRequest) => {
    return useQuery<GetAdminSubCategoriesResponse>(
        [QueryKeys.GET_ADMIN_SUBCATEGORIES, data],
        () => categoryApi.getAdminSubCategories(data),
        {
            enabled: !!data.filter.parentId,
        },
    );
};
