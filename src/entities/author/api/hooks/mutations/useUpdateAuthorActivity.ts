import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
    GetAdminAuthorResponse,
    GetAdminAuthorsResponse,
    UpdateAuthorActivityRequest,
    UpdateAuthorActivityResponse,
    authorApi,
} from "@entities/author";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";

export const useUpdateAuthorActivity = ({ id }: Omit<UpdateAuthorActivityRequest, "isActive">) => {
    return useMutation<UpdateAuthorActivityResponse, AxiosError<FormErrorResponse>, Omit<UpdateAuthorActivityRequest, "id">, unknown>(
        [MutationKeys.UPDATE_AUTHOR_ACTIVITY],
        (data) => authorApi.updateAuthorActivity({ ...data, id }),
        {
            onMutate: async ({ isActive }) => {
                await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_AUTHOR, id] });
                await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_AUTHORS] });

                const previousAuthorData = queryClient.getQueryData<GetAdminAuthorResponse>([QueryKeys.GET_ADMIN_AUTHOR, id]);
                const previousAuthorsData = queryClient.getQueriesData<GetAdminAuthorsResponse>([QueryKeys.GET_ADMIN_AUTHORS]);

                queryClient.setQueryData<GetAdminAuthorResponse>(
                    [QueryKeys.GET_ADMIN_AUTHOR, id],
                    (previousData) => previousData && { ...previousData, isActive },
                );

                queryClient.setQueriesData<GetAdminAuthorsResponse>([QueryKeys.GET_ADMIN_AUTHORS], (previousData) => {
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
                    queryClient.setQueryData([QueryKeys.GET_ADMIN_AUTHOR, id], context.previousAuthorData);
                }
                if (typeof context === "object" && context !== null && "previousAuthorsData" in context) {
                    queryClient.setQueriesData([QueryKeys.GET_ADMIN_AUTHORS], context.previousAuthorsData);
                }

                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка изменения статуса",
                });
            },
            onSettled() {
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_AUTHORS]);
            },
            onSuccess: () => {
                const authorData = queryClient.getQueryData<GetAdminAuthorResponse>([QueryKeys.GET_ADMIN_AUTHOR, id]);
                const authorFromList = queryClient
                    .getQueriesData<GetAdminAuthorsResponse>([QueryKeys.GET_ADMIN_AUTHORS])?.[0]?.[1]
                    ?.data.find((author) => author.id.toString() === id);

                const statusMessage = authorData?.isActive || authorFromList?.isActive ? "активирован" : "деактивирован";

                const fioByAuthorData = [authorData?.lastName, authorData?.firstName, authorData?.patronymic].join(" ");
                const fioByAuthorFromList = [authorFromList?.lastName, authorFromList?.firstName, authorFromList?.patronymic].join(" ");

                createNotification({
                    type: ToastType.INFO,
                    title: "Изменение статуса",
                    message: `Пользователь "${fioByAuthorData || fioByAuthorFromList}" ${statusMessage}.`,
                });
            },
        },
    );
};
