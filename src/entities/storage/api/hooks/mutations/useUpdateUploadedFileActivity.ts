import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GetAdminUploadedFileResponse, GetUploadedFilesResponse, storageApi, UpdateUploadedFileActivityResponse } from "@entities/storage";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";

export const useUpdateUploadedFileActivity = (id: number, name: string) => {
    return useMutation<UpdateUploadedFileActivityResponse, AxiosError<FormErrorResponse>, boolean>(
        [MutationKeys.UPDATE_UPLOADED_FILE_ACTIVITY, id],
        (isActive: boolean) => storageApi.updateUploadedFileActivity({ id, isActive }),
        {
            onMutate: async (updatedStatus) => {
                await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_UPLOADED_FILE, id] });
                await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_UPLOADED_FILES] });

                const previousFileData = queryClient.getQueryData<GetAdminUploadedFileResponse>([QueryKeys.GET_ADMIN_UPLOADED_FILE, id]);
                const previousFilesData = queryClient.getQueriesData<GetUploadedFilesResponse>([QueryKeys.GET_UPLOADED_FILES]);

                queryClient.setQueryData<GetAdminUploadedFileResponse>(
                    [QueryKeys.GET_ADMIN_UPLOADED_FILE, id],
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
                    queryClient.setQueryData([QueryKeys.GET_ADMIN_UPLOADED_FILE, id], context.previousFileData);
                }
                if (typeof context === "object" && context !== null && "previousFilesData" in context) {
                    queryClient.setQueriesData([QueryKeys.GET_UPLOADED_FILES], context.previousFilesData);
                }

                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка изменения статуса",
                });
            },
            onSuccess: ({ isActive }) => {
                queryClient.invalidateQueries([QueryKeys.GET_UPLOADED_FILES]);

                const statusMessage = isActive ? "активирован" : "деактивирован";

                createNotification({
                    type: ToastType.INFO,
                    title: "Изменение статуса",
                    message: `Материал "${name}" ${statusMessage}.`,
                });
            },
        }
    );
};
