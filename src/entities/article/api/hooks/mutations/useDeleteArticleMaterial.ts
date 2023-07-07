import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { DeleteAdminArticleMaterialRequest, DeleteAdminArticleMaterialResponse, articleApi } from "@entities/article";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";
import { GetUploadedFilesResponse } from "@entities/storage";

export const useDeleteArticleMaterial = (data: DeleteAdminArticleMaterialRequest) => {
    return useMutation<DeleteAdminArticleMaterialResponse, AxiosError<FormErrorResponse>, null>(
        [MutationKeys.DELETE_ARTICLE_MATERIAL, data],
        () => articleApi.deleteArticleMaterial(data),
        {
            onSuccess: () => {
                const materialFromList = queryClient
                    .getQueriesData<GetUploadedFilesResponse>([QueryKeys.GET_ADMIN_ARTICLE_MATERIALS])[0]?.[1]
                    ?.data.find((file) => file.id === data.materialId);
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_ARTICLE_MATERIALS]);

                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Удаление файла из материалов",
                    message: `Файл "${materialFromList?.name}" успешно удален`,
                });

                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_NO_ARTICLE_MATERIALS]);
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_ARTICLE_MATERIALS]);
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка удаления файла",
                });
            },
        },
    );
};
