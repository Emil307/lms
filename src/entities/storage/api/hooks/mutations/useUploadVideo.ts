import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys } from "@shared/constant";
import { storageApi, UploadFileRequest } from "@entities/storage";
import { FormErrorResponse } from "@shared/utils";
import { UploadedFile } from "@shared/ui";

export const useUploadVideo = () => {
    return useMutation<UploadedFile, AxiosError<FormErrorResponse>, UploadFileRequest>(
        [MutationKeys.UPLOAD_VIDEO],
        (data: UploadFileRequest) => storageApi.uploadVideo(data)
    );
};
