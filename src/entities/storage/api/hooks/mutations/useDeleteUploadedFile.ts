import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { DeleteUploadedFileResponse, GetAdminUploadedFileResponse, GetUploadedFilesResponse, storageApi } from "@entities/storage";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";

export const useDeleteUploadedFile = (id: string) => {
    return useMutation<DeleteUploadedFileResponse, AxiosError<FormErrorResponse>, null>(
        [MutationKeys.DELETE_UPLOADED_FILE, id],
        () => storageApi.deleteUploadedFile({ id }),
        {
            onSuccess: () => {
                const materialData = queryClient.getQueryData<GetAdminUploadedFileResponse>([QueryKeys.GET_ADMIN_UPLOADED_FILE, id]);
                const materialFromList = queryClient
                    .getQueriesData<GetUploadedFilesResponse>([QueryKeys.GET_UPLOADED_FILES])[0]?.[1]
                    ?.data.find((material) => material.id.toString() === id);

                queryClient.invalidateQueries([QueryKeys.GET_UPLOADED_FILES]);

                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Удаление материала",
                    message: `Материал "${materialData?.name || materialFromList?.name}" успешно удален`,
                });
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка удаления материала",
                });
            },
        },
    );
};
