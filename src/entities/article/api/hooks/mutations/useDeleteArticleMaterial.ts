import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { DeleteAdminArticleMaterialRequest, DeleteAdminArticleMaterialResponse, articleApi } from "@entities/article";
import { EntityNames, MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";
import { GetUploadedFilesResponse } from "@entities/storage";

export const useDeleteArticleMaterial = (
    data: DeleteAdminArticleMaterialRequest
): UseMutationResult<DeleteAdminArticleMaterialResponse, AxiosError<FormErrorResponse>, null> => {
    return useMutation([MutationKeys.DELETE_ARTICLE_MATERIAL, data], () => articleApi.deleteArticleMaterial(data), {
        onSuccess: () => {
            const materialFromList = queryClient
                .getQueriesData<GetUploadedFilesResponse>([
                    QueryKeys.GET_ADMIN_ARTICLE_MATERIALS,
                    [EntityNames.MATERIAL, EntityNames.CATEGORY, EntityNames.ARTICLE],
                ])[0]?.[1]
                ?.data.find((file) => file.id === data.materialId);
            createNotification({
                type: ToastType.SUCCESS,
                title: "Удаление файла из материалов",
                message: `Файл "${materialFromList?.name}" успешно удален`,
            });

            //TODO: Временное решение, так как на бэке не успевают обновиться зависимости
            setTimeout(() => {
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_NO_ARTICLE_MATERIALS]);
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_ARTICLE_MATERIALS]);
            }, 1500);
        },
        onError: () => {
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка удаления файла",
            });
        },
    });
};
