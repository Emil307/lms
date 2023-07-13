import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { DeleteUploadedFileResponse, storageApi } from "@entities/storage";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";

export const useDeleteUploadedFile = (id: string, name: string) => {
    return useMutation<DeleteUploadedFileResponse, AxiosError<FormErrorResponse>, null>(
        [MutationKeys.DELETE_UPLOADED_FILE, id],
        () => storageApi.deleteUploadedFile({ id }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.GET_UPLOADED_FILES]);

                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Удаление материала",
                    message: `Материал "${name}" успешно удален`,
                });
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка удаления материала",
                });
            },
        }
    );
};
