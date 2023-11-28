import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { DeleteAuthorRequest, DeleteAuthorResponse, authorApi } from "@entities/author";
import { EntityNames, MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { ToastType, createNotification, invalidateQueriesWithPredicate } from "@shared/utils";

export const useDeleteAuthor = ({
    id,
    name,
}: DeleteAuthorRequest & { name: string }): UseMutationResult<DeleteAuthorResponse, AxiosError<FormErrorResponse>, null> => {
    return useMutation([MutationKeys.DELETE_AUTHOR, id], () => authorApi.deleteAuthor({ id }), {
        onSuccess: () => {
            createNotification({
                type: ToastType.SUCCESS,
                title: "Удаление автора",
                message: `Автор "${name}" успешно удален`,
            });

            invalidateQueriesWithPredicate({ entityName: EntityNames.AUTHOR, exclude: [QueryKeys.GET_ADMIN_AUTHOR] });
        },
        onError: () => {
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка удаления автора",
            });
        },
    });
};
