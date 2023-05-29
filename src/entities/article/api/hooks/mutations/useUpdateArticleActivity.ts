import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AdminArticleDetails, GetAdminArticlesResponse, UpdateArticleActivityResponse, articleApi } from "@entities/article";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";

export const useUpdateArticleActivity = (
    id: string
): UseMutationResult<UpdateArticleActivityResponse, AxiosError<FormErrorResponse>, boolean, unknown> => {
    return useMutation(
        [MutationKeys.UPDATE_ARTICLE_ACTIVITY, id],
        (isActive: boolean) => articleApi.updateArticleActivity({ id, isActive }),
        {
            onMutate: async (updatedStatus) => {
                await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_ARTICLE, id] });
                await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_ARTICLES] });

                const previousArticleData = queryClient.getQueryData<AdminArticleDetails>([QueryKeys.GET_ADMIN_ARTICLE, id]);
                const previousArticlesData = queryClient.getQueriesData<GetAdminArticlesResponse>([QueryKeys.GET_ADMIN_ARTICLES]);

                queryClient.setQueryData<AdminArticleDetails>(
                    [QueryKeys.GET_ADMIN_ARTICLE, id],
                    (previousData) => previousData && { ...previousData, isActive: updatedStatus }
                );

                queryClient.setQueriesData<GetAdminArticlesResponse>([QueryKeys.GET_ADMIN_ARTICLES], (previousData) => {
                    if (!previousData) {
                        return undefined;
                    }

                    return {
                        ...previousData,
                        data: previousData.data.map((article) =>
                            String(article.id) === id ? { ...article, isActive: updatedStatus } : article
                        ),
                    };
                });

                return { previousArticleData, previousArticlesData };
            },
            onError: (err, _, context) => {
                if (typeof context === "object" && "previousArticleData" in context) {
                    queryClient.setQueryData([QueryKeys.GET_ADMIN_ARTICLE, id], context.previousArticleData);
                }
                if (typeof context === "object" && "previousArticlesData" in context) {
                    queryClient.setQueriesData([QueryKeys.GET_ADMIN_ARTICLES], context.previousArticlesData);
                }

                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка изменения статуса",
                });
            },
            onSettled() {
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_ARTICLES]);
            },
            onSuccess: () => {
                const articleData = queryClient.getQueryData<AdminArticleDetails>([QueryKeys.GET_ADMIN_ARTICLE, id]);
                const articleFromList = queryClient
                    .getQueriesData<GetAdminArticlesResponse>([QueryKeys.GET_ADMIN_ARTICLES])?.[0]?.[1]
                    ?.data.find((article) => article.id.toString() === id);

                const statusMessage = articleData?.isActive || articleFromList?.isActive ? "активирован" : "деактивирован";

                createNotification({
                    type: ToastType.INFO,
                    title: "Изменение статуса",
                    message: `Материал "${articleData?.name || articleFromList?.name}" ${statusMessage}.`,
                });
            },
        }
    );
};
