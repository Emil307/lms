import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { DeleteArticleFromPackageRequest, articlePackageApi } from "@entities/articlePackage";
import { EntityNames, MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";
import { GetAdminArticlesResponse } from "@entities/article";

export const useDeleteArticleFromArticlePackage = (
    params: DeleteArticleFromPackageRequest
): UseMutationResult<void, AxiosError<FormErrorResponse>, null> => {
    return useMutation(
        [MutationKeys.DELETE_ARTICLE_FROM_ARTICLE_PACKAGE, params],
        () => articlePackageApi.deleteArticleFromArticlePackage(params),
        {
            onSuccess: () => {
                const articleFromPackage = queryClient
                    .getQueriesData<GetAdminArticlesResponse>([
                        QueryKeys.GET_ADMIN_ARTICLES_FROM_ARTICLE_PACKAGE,
                        [EntityNames.ARTICLE, EntityNames.CATEGORY, EntityNames.COURSE, EntityNames.ARTICLE_PACKAGE],
                    ])[0]?.[1]
                    ?.data.find((article) => article.id === params.articleId);

                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Удаление статьи из пакета",
                    message: `Статья "${articleFromPackage?.name}" успешно удалена`,
                });

                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_ARTICLES_FROM_ARTICLE_PACKAGE]);
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка удаления статьи из пакета",
                });
            },
        }
    );
};
