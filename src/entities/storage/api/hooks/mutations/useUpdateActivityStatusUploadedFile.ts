import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GetUploadedFilesResponse, UploadedMaterialFileDetails, storageApi } from "@entities/storage";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";

export const useUpdateActivityStatusUploadedFile = (id: number) => {
    return useMutation<boolean, AxiosError<FormErrorResponse>, boolean>(
        [MutationKeys.UPDATE_ACTIVITY_UPLOADED_FILE, id],
        (status: boolean) => storageApi.updateActivityStatusUploadedFile({ id, status }),
        {
            onMutate: async (updatedStatus) => {
                await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_UPLOADED_FILES, id] });
                await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_UPLOADED_FILE] });

                const previousFileData = queryClient.getQueryData<UploadedMaterialFileDetails>([QueryKeys.GET_UPLOADED_FILE, id]);
                const previousFilesData = queryClient.getQueriesData<GetUploadedFilesResponse>([QueryKeys.GET_UPLOADED_FILES]);

                queryClient.setQueryData<UploadedMaterialFileDetails>(
                    [QueryKeys.GET_UPLOADED_FILE, id],
                    (previousData) => previousData && { ...previousData, isActive: updatedStatus }
                );

                queryClient.setQueriesData<GetUploadedFilesResponse>([QueryKeys.GET_UPLOADED_FILES], (previousData) => {
                    if (!previousData) {
                        return undefined;
                    }

                    return {
                        ...previousData,
                        data: previousData.data.map((file) => (file.id === id ? { ...file, isActive: updatedStatus } : file)),
                    };
                });

                return { previousFileData, previousFilesData };
            },
            onError: (err, _, context) => {
                if (typeof context === "object" && context !== null && "previousFileData" in context) {
                    queryClient.setQueryData([QueryKeys.GET_UPLOADED_FILE, id], context.previousFileData);
                }
                if (typeof context === "object" && context !== null && "previousFilesData" in context) {
                    queryClient.setQueriesData([QueryKeys.GET_UPLOADED_FILES], context.previousFilesData);
                }
            },
            onSettled() {
                queryClient.invalidateQueries([QueryKeys.GET_UPLOADED_FILES]);
            },
        }
    );
};
