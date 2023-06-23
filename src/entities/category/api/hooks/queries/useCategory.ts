import { useQuery } from "@tanstack/react-query";
import { GetCategoryResponse, categoryApi } from "@entities/category";
import { QueryKeys } from "@shared/constant";

export const useCategory = (id?: string) => {
    return useQuery<GetCategoryResponse>([QueryKeys.GET_CATEGORY, id], () => categoryApi.getCategory(id), { enabled: !!id });
};