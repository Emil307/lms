import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { storageApi, UploadFileRequest, UploadFileType } from "@entities/storage";
import { FormErrorResponse, UploadedFile } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";

export const useUploadFile = () => {
    return useMutation<UploadedFile, AxiosError<FormErrorResponse>, UploadFileRequest & { type: UploadFileType }>(
        [MutationKeys.UPLOAD_FILE],
        ({ type, ...data }) => {
            switch (type) {
                case "avatar":
                    return storageApi.uploadAvatar(data);
                case "image":
                    return storageApi.uploadImage(data);
                case "video":
                    return storageApi.uploadVideo(data);
                default:
                    return storageApi.uploadDocument(data);
            }
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.GET_UPLOADED_FILES]);
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка загрузки файла",
                });
            },
        }
    );
};
