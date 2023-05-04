import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { storageApi } from "@entities/storage";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";

export const useDeleteUploadedFile = (fileId: string) => {
    return useMutation<null, AxiosError<FormErrorResponse>, null>(
        [MutationKeys.DELETE_UPLOADED_FILE, fileId],
        () => storageApi.deleteUploadedFile(fileId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.GET_UPLOADED_FILES]);
            },
        }
    );
};
