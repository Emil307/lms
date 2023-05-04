import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AdminCategory, GetAdminCategoriesResponse, UpdateActivityStatusCategoryResponse, categoryApi } from "@entities/category";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { queryClient } from "@app/providers";
import { FormErrorResponse } from "@shared/types";

export const useUpdateActivityCategory = (
    id: string
): UseMutationResult<UpdateActivityStatusCategoryResponse, AxiosError<FormErrorResponse>, boolean> => {
    return useMutation(
        [MutationKeys.UPDATE_ACTIVITY_CATEGORY],
        (status) => categoryApi.updateActivityStatusCategory({ id, isActive: status }),
        {
            onMutate: async (updatedStatus) => {
                await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_CATEGORY, id] });
                await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_CATEGORIES] });

                const previousCategoryData = queryClient.getQueryData<AdminCategory>([QueryKeys.GET_ADMIN_CATEGORY, id]);
                const previousCategoriesData = queryClient.getQueriesData<GetAdminCategoriesResponse>([QueryKeys.GET_ADMIN_CATEGORIES]);

                queryClient.setQueryData<AdminCategory>(
                    [QueryKeys.GET_ADMIN_CATEGORY, id],
                    (previousData) => previousData && { ...previousData, isActive: updatedStatus }
                );

                queryClient.setQueriesData<GetAdminCategoriesResponse>([QueryKeys.GET_ADMIN_CATEGORIES], (previousData) => {
                    if (!previousData) {
                        return undefined;
                    }

                    return {
                        ...previousData,
                        data: previousData.data.map((category) =>
                            String(category.id) === id ? { ...category, isActive: updatedStatus } : category
                        ),
                    };
                });

                return { previousCategoryData, previousCategoriesData };
            },
            onError: (err, _, context) => {
                if (typeof context === "object" && context !== null && "previousCategoryData" in context) {
                    queryClient.setQueryData([QueryKeys.GET_ADMIN_CATEGORY, id], context.previousCategoryData);
                }
                if (typeof context === "object" && context !== null && "previousCategoriesData" in context) {
                    queryClient.setQueriesData([QueryKeys.GET_ADMIN_CATEGORIES], context.previousCategoriesData);
                }
            },
            onSettled() {
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_CATEGORIES]);
            },
        }
    );
};
