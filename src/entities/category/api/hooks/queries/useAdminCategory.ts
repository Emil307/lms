import { useQuery } from "@tanstack/react-query";
import { GetAdminCategoryRequest, GetAdminCategoryResponse, categoryApi } from "@entities/category";
import { QueryKeys } from "@shared/constant";

export const useAdminCategory = ({ id }: GetAdminCategoryRequest) => {
    return useQuery<GetAdminCategoryResponse>([QueryKeys.GET_ADMIN_CATEGORY, id], () => categoryApi.getAdminCategory({ id }), {
        enabled: !!id,
    });
};
