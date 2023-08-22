import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { DeleteAuthorRequest, DeleteAuthorResponse, authorApi } from "@entities/author";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";

export const useDeleteAuthor = ({ id, name }: DeleteAuthorRequest & { name: string }) => {
    return useMutation<DeleteAuthorResponse, AxiosError<FormErrorResponse>, null>(
        [MutationKeys.DELETE_AUTHOR, id],
        () => authorApi.deleteAuthor({ id }),
        {
            onSuccess: () => {
                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Удаление автора",
                    message: `Автор "${name}" успешно удален`,
                });

                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_AUTHORS]);
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка удаления автора",
                });
            },
        }
    );
};
