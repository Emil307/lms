import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { categoryApi } from "@entities/category";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { queryClient } from "@app/providers";

export const useActivateCategory = (id: string): UseMutationResult<unknown, unknown, void, unknown> => {
    return useMutation([MutationKeys.ACTIVATE_CATEGORY], () => categoryApi.activateCategory(id), {
        onSuccess: () => {
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_CATEGORY, id]);
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_CATEGORIES]);
        },
    });
};
