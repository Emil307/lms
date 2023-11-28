import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { categoryApi, GetAdminSubCategoriesRequest, GetAdminSubCategoriesResponse } from "@entities/category";
import { EntityNames, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";

export const useAdminSubCategories = (
    data: GetAdminSubCategoriesRequest
): UseQueryResult<GetAdminSubCategoriesResponse, AxiosError<FormErrorResponse>> => {
    return useQuery([QueryKeys.GET_ADMIN_SUBCATEGORIES, [EntityNames.CATEGORY], data], () => categoryApi.getAdminSubCategories(data), {
        enabled: !!data.filter.parentId,
    });
};
