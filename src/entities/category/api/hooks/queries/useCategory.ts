import { useQuery } from "@tanstack/react-query";
import { GetCategoryRequest, GetCategoryResponse, categoryApi } from "@entities/category";
import { QueryKeys } from "@shared/constant";

export const useCategory = ({ id }: GetCategoryRequest) => {
    return useQuery<GetCategoryResponse>([QueryKeys.GET_CATEGORY, id], () => categoryApi.getCategory({ id }), {
        enabled: !!id && id !== "null",
    });
};
