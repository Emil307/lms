import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys } from "@shared/constant";
import { storageApi, UploadFileRequest } from "@entities/storage";
import { FormErrorResponse } from "@shared/types";
import { UploadedFile } from "@shared/ui";

export const useUploadImage = () => {
    return useMutation<UploadedFile, AxiosError<FormErrorResponse>, UploadFileRequest>(
        [MutationKeys.UPLOAD_IMAGE],
        (data: UploadFileRequest) => storageApi.uploadImage(data)
    );
};
