import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UpdateUploadedFilesRequest, storageApi } from "@entities/storage";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";

export const useUpdateUploadedFiles = (fileId?: number) => {
    return useMutation<void, AxiosError<FormErrorResponse>, UpdateUploadedFilesRequest>(
        [MutationKeys.UPDATE_UPLOADED_FILES],
        (data) => storageApi.updateUploadedFiles(data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.GET_UPLOADED_FILES]);
                queryClient.invalidateQueries([QueryKeys.GET_UPLOADED_FILE, fileId || {}]);
            },
        }
    );
};
