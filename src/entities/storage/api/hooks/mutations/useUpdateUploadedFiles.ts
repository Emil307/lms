import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UpdateUploadedFilesRequest, UpdateUploadedFilesResponse, storageApi } from "@entities/storage";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";

export const useUpdateUploadedFiles = (fileId?: number) => {
    return useMutation<UpdateUploadedFilesResponse, AxiosError<FormErrorResponse>, UpdateUploadedFilesRequest>(
        [MutationKeys.UPDATE_UPLOADED_FILES],
        (data) => storageApi.updateUploadedFiles(data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.GET_UPLOADED_FILES]);
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_UPLOADED_FILE, fileId || {}]);

                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Изменения сохранены",
                });
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка обновления файлов",
                });
            },
        }
    );
};
