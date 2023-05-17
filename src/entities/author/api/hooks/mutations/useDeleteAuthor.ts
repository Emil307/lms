import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Author, GetAuthorsResponse, authorApi } from "@entities/author";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";

export const useDeleteAuthor = (id: string) => {
    return useMutation<void, AxiosError<FormErrorResponse>, null>([MutationKeys.DELETE_AUTHOR, id], () => authorApi.deleteAuthor(id), {
        onSuccess: () => {
            const authorData = queryClient.getQueryData<Author>([QueryKeys.GET_AUTHOR, id]);
            const authorFromList = queryClient
                .getQueriesData<GetAuthorsResponse>([QueryKeys.GET_AUTHORS])[0]?.[1]
                ?.data.find((author) => author.id.toString() === id);

            const fioByAuthorData = [authorData?.lastName, authorData?.firstName, authorData?.patronymic].join(" ");
            const fioByAuthorFromList = [authorFromList?.lastName, authorFromList?.firstName, authorFromList?.patronymic].join(" ");

            createNotification({
                type: ToastType.SUCCESS,
                title: "Удаление автора",
                message: `Автор "${fioByAuthorData || fioByAuthorFromList}" успешно удален`,
            });

            queryClient.invalidateQueries([QueryKeys.GET_AUTHORS]);
        },
        onError: () => {
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка удаления автора",
            });
        },
    });
};
