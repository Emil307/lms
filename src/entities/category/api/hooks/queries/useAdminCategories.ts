import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { categoryApi, GetAdminCategoriesRequest } from "@entities/category";
import { QueryKeys } from "@shared/constant";

export const useAdminCategories = (params: GetAdminCategoriesRequest) => {
    const router = useRouter();
    return useQuery([QueryKeys.GET_ADMIN_CATEGORIES, params], () => categoryApi.getAdminCategories(params), {
        keepPreviousData: true,
        enabled: router.isReady,
        refetchOnMount: true,
    });
};
