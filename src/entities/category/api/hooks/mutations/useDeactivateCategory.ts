import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { categoryApi } from "@entities/category";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { queryClient } from "@app/providers";

export const useDeactivateCategory = (id: string): UseMutationResult<unknown, unknown, void, unknown> => {
    return useMutation([MutationKeys.DEACTIVATE_CATEGORY], () => categoryApi.deactivateCategory(id), {
        onSuccess: () => {
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_CATEGORY, id]);
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_CATEGORIES]);
        },
    });
};
