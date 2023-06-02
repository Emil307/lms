import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { UpdateArticleRequest, UpdateArticleResponse, articleApi } from "@entities/article";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";

export const useUpdateArticle = (id: string) => {
    return useMutation<UpdateArticleResponse, AxiosError<FormErrorResponse>, Omit<UpdateArticleRequest, "id">>(
        [MutationKeys.UPDATE_ARTICLE, id],
        (data) => articleApi.updateArticle({ ...data, id }),
        {
            onSuccess: () => {
                //TODO: Optimistic тут пока не применял, тк не все поля нормально обновить из-за типов, например tags, category, subcategory
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_ARTICLE, id]);
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_ARTICLES]);

                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Изменения сохранены",
                });
            },

            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка обновления статьи",
                });
            },
        }
    );
};
