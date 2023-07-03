import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
    DeleteAdminCategoryRequest,
    DeleteAdminCategoryResponse,
    GetAdminCategoriesResponse,
    GetAdminCategoryResponse,
    categoryApi,
} from "@entities/category";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";

export const useDeleteCategory = ({ id }: DeleteAdminCategoryRequest) => {
    return useMutation<DeleteAdminCategoryResponse, AxiosError<FormErrorResponse>, null>(
        [MutationKeys.DELETE_CATEGORY, id],
        () => categoryApi.deleteAdminCategory({ id }),
        {
            onSuccess: () => {
                const categoryData = queryClient.getQueryData<GetAdminCategoryResponse>([QueryKeys.GET_ADMIN_CATEGORY, id]);
                const categoryFromList = queryClient
                    .getQueriesData<GetAdminCategoriesResponse>([QueryKeys.GET_ADMIN_CATEGORIES])[0]?.[1]
                    ?.data.find((category) => category.id.toString() === id);

                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Удаление категории",
                    message: `Категория "${categoryData?.name || categoryFromList?.name}" успешно удалена`,
                });

                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_CATEGORIES]);
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_SUBCATEGORIES_PAGINATE]);
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_SUBCATEGORIES]);
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка удаления категории",
                });
            },
        }
    );
};
