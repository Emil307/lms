import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { AdminCategory, categoryApi, UpdateAdminCategoryRequest } from "@entities/category";

export const useUpdateCategory = (id: string) => {
    return useMutation<AdminCategory, AxiosError<FormErrorResponse>, UpdateAdminCategoryRequest>(
        [MutationKeys.UPDATE_CATEGORY, id],
        (data) => categoryApi.updateAdminCategory({ id, ...data }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_CATEGORIES]);
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_CATEGORY, id]);
            },
        }
    );
};
