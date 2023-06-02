import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CreateArticleRequest, CreateArticleResponse, articleApi } from "@entities/article";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";

export const useCreateArticle = () => {
    return useMutation<CreateArticleResponse, AxiosError<FormErrorResponse>, CreateArticleRequest>(
        [MutationKeys.CREATE_ARTICLE],
        (data) => articleApi.createArticle(data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_ARTICLES]);

                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Создание статьи",
                    message: "Статья успешно создана",
                });
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка создания статьи",
                });
            },
        }
    );
};
