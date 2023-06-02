import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GetAdminArticleResponse, GetAdminArticlesResponse, articleApi } from "@entities/article";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";

export const useDeleteArticle = (id: string) => {
    return useMutation<void, AxiosError<FormErrorResponse>, null>([MutationKeys.DELETE_ARTICLE, id], () => articleApi.deleteArticle(id), {
        onSuccess: () => {
            const articleData = queryClient.getQueryData<GetAdminArticleResponse>([QueryKeys.GET_ADMIN_ARTICLE, id]);
            const articleFromList = queryClient
                .getQueriesData<GetAdminArticlesResponse>([QueryKeys.GET_ADMIN_ARTICLES])[0]?.[1]
                ?.data.find((article) => article.id.toString() === id);

            createNotification({
                type: ToastType.SUCCESS,
                title: "Удаление статьи",
                message: `Статья "${articleData?.name || articleFromList?.name}" успешно удалена`,
            });

            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_ARTICLES]);
        },
        onError: () => {
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка удаления статьи",
            });
        },
    });
};
