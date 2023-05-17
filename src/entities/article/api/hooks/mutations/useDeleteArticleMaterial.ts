import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { DeleteAdminArticleMaterialRequest, GetAdminArticleMaterialsResponse, articleApi } from "@entities/article";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";

export const useDeleteArticleMaterial = (data: DeleteAdminArticleMaterialRequest) => {
    return useMutation<void, AxiosError<FormErrorResponse>, null>(
        [MutationKeys.DELETE_ARTICLE_MATERIAL, data],
        () => articleApi.deleteArticleMaterial(data),
        {
            onSuccess: () => {
                const materialFromList = queryClient
                    .getQueriesData<GetAdminArticleMaterialsResponse>([QueryKeys.GET_ADMIN_ARTICLE_MATERIALS])[0]?.[1]
                    ?.data.find((file) => file.id === data.materialId);
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_ARTICLE_MATERIALS]);

                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Удаление файла",
                    message: `Файла "${materialFromList?.name}" успешно удален`,
                });
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка удаления файла",
                });
            },
        }
    );
};
