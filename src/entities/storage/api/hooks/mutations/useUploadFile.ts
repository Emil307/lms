import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys } from "@shared/constant";
import { storageApi, UploadFileRequest, UploadFileType } from "@entities/storage";
import { FormErrorResponse } from "@shared/types";
import { UploadedFile } from "@shared/ui";

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
        }
    );
};
