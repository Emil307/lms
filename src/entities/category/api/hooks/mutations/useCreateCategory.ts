import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { AdminCategory, categoryApi, CreateAdminCategoryRequest } from "@entities/category";
import { ToastType, createNotification } from "@shared/utils";

export const useCreateCategory = (isActive: boolean, parentId?: number) => {
    return useMutation<AdminCategory, AxiosError<FormErrorResponse>, CreateAdminCategoryRequest>(
        [MutationKeys.CREATE_CATEGORY],
        (data) => categoryApi.createAdminCategory({ parentId, isActive, ...data }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_CATEGORIES]);
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_SUBCATEGORIES]);

                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Создание категории",
                    message: "Категория успешно создана",
                });
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка создания категории",
                });
            },
        }
    );
};
