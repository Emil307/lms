import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { AdminCategory, categoryApi, CreateAdminCategoryRequest } from "@entities/category";

export const useCreateCategory = (parentId?: number) => {
    return useMutation<AdminCategory, AxiosError<FormErrorResponse>, CreateAdminCategoryRequest>(
        [MutationKeys.CREATE_CATEGORY],
        (data) => categoryApi.createAdminCategory({ parentId, ...data }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_CATEGORIES]);
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_SUBCATEGORIES]);
            },
        }
    );
};
