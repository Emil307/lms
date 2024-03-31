import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GetUploadedFilesResponse, storageApi, UpdateUploadedFileActivityResponse } from "@entities/storage";
import { EntityNames, MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification, invalidateQueriesWithPredicate } from "@shared/utils";

export const useUpdateUploadedFileActivity = (
    id: number,
    name: string
): UseMutationResult<UpdateUploadedFileActivityResponse, AxiosError<FormErrorResponse>, boolean> => {
    return useMutation(
        [MutationKeys.UPDATE_UPLOADED_FILE_ACTIVITY, id],
        (isActive: boolean) => storageApi.updateUploadedFileActivity({ id, isActive }),
        {
            onMutate: async (updatedStatus) => {
                await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_UPLOADED_FILES, [EntityNames.MATERIAL, EntityNames.CATEGORY]] });

                const previousFilesData = queryClient.getQueriesData<GetUploadedFilesResponse>([
                    QueryKeys.GET_UPLOADED_FILES,
                    [EntityNames.MATERIAL, EntityNames.CATEGORY],
                ]);

                queryClient.setQueriesData<GetUploadedFilesResponse>(
                    [QueryKeys.GET_UPLOADED_FILES, [EntityNames.MATERIAL, EntityNames.CATEGORY]],
                    (previousData) => {
                        if (!previousData) {
                            return undefined;
                        }

                        return {
                            ...previousData,
                            data: previousData.data.map((file) => (file.id === id ? { ...file, isActive: updatedStatus } : file)),
                        };
                    }
                );

                return { previousFilesData };
            },
            onError: (err, _, context) => {
                if (typeof context === "object" && "previousFilesData" in context) {
                    queryClient.setQueriesData(
                        [QueryKeys.GET_UPLOADED_FILES, [EntityNames.MATERIAL, EntityNames.CATEGORY]],
                        context.previousFilesData
                    );
                }

                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка изменения статуса",
                });
            },
            onSettled: () => {
                invalidateQueriesWithPredicate({ entityName: EntityNames.MATERIAL });
            },
            onSuccess: ({ isActive }) => {
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
