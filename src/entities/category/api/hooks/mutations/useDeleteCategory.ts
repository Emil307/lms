import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { categoryApi } from "@entities/category";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";

export const useDeleteCategory = (categoryId: string) => {
    return useMutation<void, AxiosError<FormErrorResponse>, null>(
        [MutationKeys.DELETE_CATEGORY, categoryId],
        () => categoryApi.deleteCategory(categoryId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_CATEGORIES]);
            },
        }
    );
};
