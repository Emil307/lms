import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GetAdminArticleResponse, GetAdminArticlesResponse, articleApi } from "@entities/article";
import { EntityNames, MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification, invalidateQueriesWithPredicate } from "@shared/utils";

export const useDeleteArticle = (id: string): UseMutationResult<void, AxiosError<FormErrorResponse>, null> => {
    return useMutation([MutationKeys.DELETE_ARTICLE, id], () => articleApi.deleteArticle(id), {
        onSuccess: () => {
            const articleData = queryClient.getQueryData<GetAdminArticleResponse>([
                QueryKeys.GET_ADMIN_ARTICLE,
                [EntityNames.ARTICLE, EntityNames.CATEGORY, EntityNames.TAG],
                id,
            ]);
            const articleFromList = queryClient
                .getQueriesData<GetAdminArticlesResponse>([QueryKeys.GET_ADMIN_ARTICLES])[0]?.[1]
                ?.data.find((article) => article.id.toString() === id);

            createNotification({
                type: ToastType.SUCCESS,
                title: "Удаление статьи",
                message: `Статья "${articleData?.name || articleFromList?.name}" успешно удалена`,
            });

            invalidateQueriesWithPredicate({ entityName: EntityNames.ARTICLE, exclude: [QueryKeys.GET_ADMIN_ARTICLE] });
        },
        onError: () => {
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка удаления статьи",
            });
        },
    });
};
