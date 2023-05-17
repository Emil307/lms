import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { authorApi, Author, CreateAuthorRequest } from "@entities/author";
import { ToastType, createNotification } from "@shared/utils";

export const useCreateAuthor = () => {
    return useMutation<Author, AxiosError<FormErrorResponse>, CreateAuthorRequest>(
        [MutationKeys.CREATE_AUTHOR],
        (data) => authorApi.createAuthor(data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.GET_AUTHORS]);

                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Создание автора",
                    message: "Автор успешно создан",
                });
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка создания автора",
                });
            },
        }
    );
};
