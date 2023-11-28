import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
    GetAdminAuthorResponse,
    GetAdminAuthorsResponse,
    UpdateAuthorActivityRequest,
    UpdateAuthorActivityResponse,
    authorApi,
} from "@entities/author";
import { EntityNames, MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";

export const useUpdateAuthorActivity = ({ id, name }: Pick<UpdateAuthorActivityRequest, "id"> & { name: string }) => {
    return useMutation<UpdateAuthorActivityResponse, AxiosError<FormErrorResponse>, Omit<UpdateAuthorActivityRequest, "id">, unknown>(
        [MutationKeys.UPDATE_AUTHOR_ACTIVITY],
        (data) => authorApi.updateAuthorActivity({ ...data, id }),
        {
            onMutate: async ({ isActive }) => {
                await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_AUTHOR, [EntityNames.AUTHOR, EntityNames.USER], id] });
                await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_AUTHORS, [EntityNames.AUTHOR]] });

                const previousAuthorData = queryClient.getQueryData<GetAdminAuthorResponse>([
                    QueryKeys.GET_ADMIN_AUTHOR,
                    [EntityNames.AUTHOR, EntityNames.USER],
                    id,
                ]);
                const previousAuthorsData = queryClient.getQueriesData<GetAdminAuthorsResponse>([
                    QueryKeys.GET_ADMIN_AUTHORS,
                    [EntityNames.AUTHOR],
                ]);

                queryClient.setQueryData<GetAdminAuthorResponse>(
                    [QueryKeys.GET_ADMIN_AUTHOR, [EntityNames.AUTHOR, EntityNames.USER], id],
                    (previousData) => previousData && { ...previousData, isActive }
                );

                queryClient.setQueriesData<GetAdminAuthorsResponse>([QueryKeys.GET_ADMIN_AUTHORS, [EntityNames.AUTHOR]], (previousData) => {
                    if (!previousData) {
                        return undefined;
                    }

                    return {
                        ...previousData,
                        data: previousData.data.map((author) => (String(author.id) === id ? { ...author, isActive } : author)),
                    };
                });

                return { previousAuthorData, previousAuthorsData };
            },
            onError: (err, _, context) => {
                if (typeof context === "object" && context !== null && "previousAuthorData" in context) {
                    queryClient.setQueryData(
                        [QueryKeys.GET_ADMIN_AUTHOR, [EntityNames.AUTHOR, EntityNames.USER], id],
                        context.previousAuthorData
                    );
                }
                if (typeof context === "object" && context !== null && "previousAuthorsData" in context) {
                    queryClient.setQueriesData([QueryKeys.GET_ADMIN_AUTHORS, [EntityNames.AUTHOR]], context.previousAuthorsData);
                }

                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка изменения статуса",
                });
            },
            onSettled() {
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_AUTHORS]);
            },
            onSuccess: ({ isActive }) => {
                const statusMessage = isActive ? "активирован" : "деактивирован";

                createNotification({
                    type: ToastType.INFO,
                    title: "Изменение статуса",
                    message: `Пользователь "${name}" ${statusMessage}.`,
                });
            },
        }
    );
};
