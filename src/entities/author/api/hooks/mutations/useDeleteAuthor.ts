import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { DeleteAuthorRequest, DeleteAuthorResponse, GetAdminAuthorResponse, GetAdminAuthorsResponse, authorApi } from "@entities/author";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";

export const useDeleteAuthor = ({ id }: DeleteAuthorRequest) => {
    return useMutation<DeleteAuthorResponse, AxiosError<FormErrorResponse>, null>(
        [MutationKeys.DELETE_AUTHOR, id],
        () => authorApi.deleteAuthor({ id }),
        {
            onSuccess: () => {
                const authorData = queryClient.getQueryData<GetAdminAuthorResponse>([QueryKeys.GET_ADMIN_AUTHOR, id]);
                const authorFromList = queryClient
                    .getQueriesData<GetAdminAuthorsResponse>([QueryKeys.GET_ADMIN_AUTHORS])[0]?.[1]
                    ?.data.find((author) => author.id.toString() === id);

                const fioByAuthorData = [authorData?.lastName, authorData?.firstName, authorData?.patronymic].join(" ");
                const fioByAuthorFromList = [authorFromList?.lastName, authorFromList?.firstName, authorFromList?.patronymic].join(" ");

                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Удаление автора",
                    message: `Автор "${fioByAuthorData || fioByAuthorFromList}" успешно удален`,
                });

                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_AUTHORS]);
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка удаления автора",
                });
            },
        },
    );
};
