import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { DeleteUploadedFileResponse, storageApi } from "@entities/storage";
import { EntityNames, MutationKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { ToastType, createNotification, invalidateQueriesWithPredicate } from "@shared/utils";

export const useDeleteUploadedFile = (
    id: string,
    name: string
): UseMutationResult<DeleteUploadedFileResponse, AxiosError<FormErrorResponse>, null> => {
    return useMutation([MutationKeys.DELETE_UPLOADED_FILE, id], () => storageApi.deleteUploadedFile({ id }), {
        onSuccess: () => {
            createNotification({
                type: ToastType.SUCCESS,
                title: "Удаление материала",
                message: `Материал "${name}" успешно удален`,
            });

            invalidateQueriesWithPredicate({ entityName: EntityNames.MATERIAL });
        },
        onError: () => {
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка удаления материала",
            });
        },
    });
};
