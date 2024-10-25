import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FileType, storageApi, UploadFileRequest, UploadFileResponse } from "@entities/storage";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";

export const useUploadFile = (
    invalidateOnSuccess = true,
): UseMutationResult<UploadFileResponse, AxiosError<FormErrorResponse>, UploadFileRequest & { type: FileType }> => {
    return useMutation(
        [MutationKeys.UPLOAD_FILE],
        ({ type, ...data }) => {
            switch (type) {
                case "avatar":
                    return storageApi.uploadAvatar(data);
                case "image":
                    return storageApi.uploadImage(data);
                case "images":
                    return storageApi.uploadImage(data);
                case "video":
                    return storageApi.uploadVideo(data);
                default:
                    return storageApi.uploadDocument(data);
            }
        },
        {
            onSuccess: () => {
                if (!invalidateOnSuccess) {
                    return;
                }
                queryClient.invalidateQueries([QueryKeys.GET_UPLOADED_FILES]);
                queryClient.invalidateQueries([QueryKeys.GET_UPLOADED_FILE_RESOURCE]);
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_LESSON_MATERIALS_FOR_SELECT]);
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_NO_ARTICLE_MATERIALS]);
            },
            onError: (error) => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка загрузки файла",
                    message: error.response?.data.message || error.message,
                });
            },
        }
    );
};
