import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { DeleteAdminCategoryRequest, DeleteAdminCategoryResponse, categoryApi } from "@entities/category";
import { EntityNames, MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { ToastType, createNotification, invalidateQueriesWithPredicate } from "@shared/utils";

export const useDeleteCategory = ({
    id,
    name,
}: DeleteAdminCategoryRequest & { name: string }): UseMutationResult<DeleteAdminCategoryResponse, AxiosError<FormErrorResponse>, null> => {
    return useMutation([MutationKeys.DELETE_CATEGORY, id], () => categoryApi.deleteAdminCategory({ id }), {
        onSuccess: () => {
            createNotification({
                type: ToastType.SUCCESS,
                title: "Удаление категории",
                message: `Категория "${name}" успешно удалена`,
            });
            invalidateQueriesWithPredicate({ entityName: EntityNames.CATEGORY, exclude: [QueryKeys.GET_ADMIN_CATEGORY] });
        },
        onError: () => {
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка удаления категории",
            });
        },
    });
};
