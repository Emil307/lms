import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UpdateUploadedFilesRequest, UpdateUploadedFilesResponse, storageApi } from "@entities/storage";
import { EntityNames, MutationKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { ToastType, createNotification, invalidateQueriesWithPredicate } from "@shared/utils";

export const useUpdateUploadedFiles = (): UseMutationResult<
    UpdateUploadedFilesResponse,
    AxiosError<FormErrorResponse>,
    UpdateUploadedFilesRequest
> => {
    return useMutation([MutationKeys.UPDATE_UPLOADED_FILES], (data) => storageApi.updateUploadedFiles(data), {
        onSuccess: () => {
            createNotification({
                type: ToastType.SUCCESS,
                title: "Изменения сохранены",
            });

            invalidateQueriesWithPredicate({ entityName: EntityNames.MATERIAL });
        },
        onError: () => {
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка обновления файлов",
            });
        },
    });
};
