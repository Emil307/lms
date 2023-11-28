import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
    GetAdminCategoriesResponse,
    GetAdminCategoryResponse,
    UpdateAdminCategoryActivityRequest,
    UpdateAdminCategoryActivityResponse,
    categoryApi,
} from "@entities/category";
import { EntityNames, MutationKeys, QueryKeys } from "@shared/constant";
import { queryClient } from "@app/providers";
import { FormErrorResponse } from "@shared/types";
import { ToastType, createNotification } from "@shared/utils";

export const useAdminUpdateCategoryActivity = ({
    id,
    name,
}: Pick<UpdateAdminCategoryActivityRequest, "id"> & { name?: string }): UseMutationResult<
    UpdateAdminCategoryActivityResponse,
    AxiosError<FormErrorResponse>,
    Omit<UpdateAdminCategoryActivityRequest, "id">
> => {
    return useMutation([MutationKeys.UPDATE_CATEGORY_ACTIVITY, id], (data) => categoryApi.updateAdminCategoryActivity({ ...data, id }), {
        onMutate: async ({ isActive }) => {
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_CATEGORY, [EntityNames.CATEGORY, EntityNames.USER], id] });
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_CATEGORIES, [EntityNames.CATEGORY]] });

            const previousCategoryData = queryClient.getQueryData<GetAdminCategoryResponse>([
                QueryKeys.GET_ADMIN_CATEGORY,
                [EntityNames.CATEGORY, EntityNames.USER],
                id,
            ]);
            const previousCategoriesData = queryClient.getQueriesData<GetAdminCategoriesResponse>([
                QueryKeys.GET_ADMIN_CATEGORIES,
                [EntityNames.CATEGORY],
            ]);

            queryClient.setQueryData<GetAdminCategoryResponse>(
                [QueryKeys.GET_ADMIN_CATEGORY, [EntityNames.CATEGORY, EntityNames.USER], id],
                (previousData) => previousData && { ...previousData, isActive }
            );

            queryClient.setQueriesData<GetAdminCategoriesResponse>(
                [QueryKeys.GET_ADMIN_CATEGORIES, [EntityNames.CATEGORY]],
                (previousData) => {
                    if (!previousData) {
                        return undefined;
                    }

                    return {
                        ...previousData,
                        data: previousData.data.map((category) => (String(category.id) === id ? { ...category, isActive } : category)),
                    };
                }
            );

            return { previousCategoryData, previousCategoriesData };
        },
        onError: (err, _, context) => {
            if (typeof context === "object" && "previousCategoryData" in context) {
                queryClient.setQueryData(
                    [QueryKeys.GET_ADMIN_CATEGORY, [EntityNames.CATEGORY, EntityNames.USER], id],
                    context.previousCategoryData
                );
            }
            if (typeof context === "object" && "previousCategoriesData" in context) {
                queryClient.setQueriesData([QueryKeys.GET_ADMIN_CATEGORIES, [EntityNames.CATEGORY]], context.previousCategoriesData);
            }

            createNotification({
                type: ToastType.WARN,
                title: "Ошибка изменения статуса",
            });
        },
        onSettled() {
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_CATEGORIES]);
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_CATEGORY, [EntityNames.CATEGORY, EntityNames.USER], id]);
            //ресурсы/фильтра
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_ARTICLE_FILTERS]);
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_ARTICLE_RESOURCES_CREATE]);
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_ARTICLE_PACKAGE_FILTERS]);
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_ARTICLE_PACKAGE_RESOURCES_CREATE]);
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_COURSE_RESOURCES]);
            queryClient.invalidateQueries([QueryKeys.GET_COURSE_RESOURCES]);
            queryClient.invalidateQueries([QueryKeys.GET_UPLOADED_FILE_RESOURCE]);
            //[entityName] has category
            queryClient.invalidateQueries([QueryKeys.GET_ARTICLE_CATEGORIES]);
            // category - field [entityName]
            queryClient.invalidateQueries([QueryKeys.GET_COURSES]);
            //TODO: Возможно еще какие-нибудь ключи, тк бек не может точно мне представить где активность курса влияет на отображение, а где нет
        },
        onSuccess: ({ isActive }) => {
            const statusMessage = isActive ? "активирован" : "деактивирован";

            createNotification({
                type: ToastType.INFO,
                title: "Изменение статуса",
                message: `Категория "${name}" ${statusMessage}.`,
            });
        },
    });
};
