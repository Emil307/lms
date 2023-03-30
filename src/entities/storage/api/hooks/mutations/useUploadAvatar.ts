import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys } from "@shared/constant";
import { storageApi, UploadFileRequest } from "@entities/storage";
import { UploadedFile } from "@shared/ui";
import { FormErrorResponse } from "@shared/utils";

export const useUploadAvatar = () => {
    return useMutation<UploadedFile, AxiosError<FormErrorResponse>, UploadFileRequest>(
        [MutationKeys.UPLOAD_AVATAR],
        (data: UploadFileRequest) => storageApi.uploadAvatar(data)
    );
};
