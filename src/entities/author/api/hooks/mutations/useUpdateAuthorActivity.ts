import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Author, GetAuthorsResponse, authorApi } from "@entities/author";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";

export const useUpdateActivityAuthor = (id: string) => {
    //TODO: Поправить как обновят беки что при обвлении всегда возвращается модель
    return useMutation<{ status: boolean }, AxiosError<FormErrorResponse>, boolean, unknown>(
        [MutationKeys.UPDATE_AUTHOR_ACTIVITY],
        (status: boolean) => authorApi.updateAuthorActivity({ id, status }),
        {
            onMutate: async (updatedStatus) => {
                await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_AUTHOR, id] });
                await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_AUTHORS] });

                const previousAuthorData = queryClient.getQueryData<Author>([QueryKeys.GET_AUTHOR, id]);
                const previousAuthorsData = queryClient.getQueriesData<GetAuthorsResponse>([QueryKeys.GET_AUTHORS]);

                queryClient.setQueryData<Author>(
                    [QueryKeys.GET_AUTHOR, id],
                    (previousData) => previousData && { ...previousData, isActive: updatedStatus }
                );

                queryClient.setQueriesData<GetAuthorsResponse>([QueryKeys.GET_AUTHORS], (previousData) => {
                    if (!previousData) {
                        return undefined;
                    }

                    return {
                        ...previousData,
                        data: previousData.data.map((author) =>
                            String(author.id) === id ? { ...author, isActive: updatedStatus } : author
                        ),
                    };
                });

                return { previousAuthorData, previousAuthorsData };
            },
            onError: (err, _, context) => {
                if (typeof context === "object" && context !== null && "previousAuthorData" in context) {
                    queryClient.setQueryData<Author>([QueryKeys.GET_AUTHOR, id], context.previousAuthorData as Author);
                }
                if (typeof context === "object" && context !== null && "previousAuthorsData" in context) {
                    queryClient.setQueriesData([QueryKeys.GET_AUTHORS], context.previousAuthorsData);
                }

                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка изменения статуса",
                });
            },
            onSettled() {
                queryClient.invalidateQueries([QueryKeys.GET_AUTHOR, id]);
                queryClient.invalidateQueries([QueryKeys.GET_AUTHORS]);
            },
            onSuccess: () => {
                const authorData = queryClient.getQueryData<Author>([QueryKeys.GET_AUTHOR, id]);
                const authorFromList = queryClient
                    .getQueriesData<GetAuthorsResponse>([QueryKeys.GET_AUTHORS])?.[0]?.[1]
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
        }
    );
};
