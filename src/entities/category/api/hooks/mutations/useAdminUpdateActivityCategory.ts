import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
    GetAdminCategoriesResponse,
    GetAdminCategoryResponse,
    UpdateAdminCategoryActivityRequest,
    UpdateAdminCategoryActivityResponse,
    categoryApi,
} from "@entities/category";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { queryClient } from "@app/providers";
import { FormErrorResponse } from "@shared/types";
import { ToastType, createNotification } from "@shared/utils";

export const useAdminUpdateCategoryActivity = ({
    id,
}: Pick<UpdateAdminCategoryActivityRequest, "id">): UseMutationResult<
    UpdateAdminCategoryActivityResponse,
    AxiosError<FormErrorResponse>,
    Omit<UpdateAdminCategoryActivityRequest, "id">
> => {
    return useMutation([MutationKeys.UPDATE_CATEGORY_ACTIVITY, id], (data) => categoryApi.updateAdminCategoryActivity({ ...data, id }), {
        onMutate: async ({ isActive }) => {
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_CATEGORY, id] });
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_CATEGORIES] });

            const previousCategoryData = queryClient.getQueryData<GetAdminCategoryResponse>([QueryKeys.GET_ADMIN_CATEGORY, id]);
            const previousCategoriesData = queryClient.getQueriesData<GetAdminCategoriesResponse>([QueryKeys.GET_ADMIN_CATEGORIES]);

            queryClient.setQueryData<GetAdminCategoryResponse>(
                [QueryKeys.GET_ADMIN_CATEGORY, id],
                (previousData) => previousData && { ...previousData, isActive },
            );

            queryClient.setQueriesData<GetAdminCategoriesResponse>([QueryKeys.GET_ADMIN_CATEGORIES], (previousData) => {
                if (!previousData) {
                    return undefined;
                }

                return {
                    ...previousData,
                    data: previousData.data.map((category) => (String(category.id) === id ? { ...category, isActive } : category)),
                };
            });

            return { previousCategoryData, previousCategoriesData };
        },
        onError: (err, _, context) => {
            if (typeof context === "object" && "previousCategoryData" in context) {
                queryClient.setQueryData([QueryKeys.GET_ADMIN_CATEGORY, id], context.previousCategoryData);
            }
            if (typeof context === "object" && "previousCategoriesData" in context) {
                queryClient.setQueriesData([QueryKeys.GET_ADMIN_CATEGORIES], context.previousCategoriesData);
            }

            createNotification({
                type: ToastType.WARN,
                title: "Ошибка изменения статуса",
            });
        },
        onSettled() {
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_CATEGORIES]);
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_CATEGORY, id]);
        },
        onSuccess: () => {
            const categoryData = queryClient.getQueryData<GetAdminCategoryResponse>([QueryKeys.GET_ADMIN_CATEGORY, id]);
            const categoryFromList = queryClient
                .getQueriesData<GetAdminCategoriesResponse>([QueryKeys.GET_ADMIN_CATEGORIES])[0]?.[1]
                ?.data.find((category) => category.id.toString() === id);

            const categoryName = categoryData?.name || categoryFromList?.name;

            const statusMessage = categoryData?.isActive || categoryFromList?.isActive ? "активирован" : "деактивирован";

            createNotification({
                type: ToastType.INFO,
                title: "Изменение статуса",
                message: `Категория "${categoryName}" ${statusMessage}.`,
            });
        },
    });
};
