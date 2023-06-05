import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ArticleFromList, GetArticleResponse, UpdateArticleFavoriteResponse, articleApi } from "@entities/article";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { queryClient } from "@app/providers";
import { TPaginationResponse, ToastType, createNotification } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";

type GetArticlesQueriesData = { pages: TPaginationResponse<ArticleFromList[]>[]; pageParams: Array<number | null> };

export const useUpdateArticleFavorite = (
    id: string
): UseMutationResult<UpdateArticleFavoriteResponse, AxiosError<FormErrorResponse>, boolean, unknown> => {
    return useMutation(
        [MutationKeys.UPDATE_ARTICLE_FAVORITE, id],
        (isFavorite: boolean) => articleApi.updateArticleFavorite({ id, isFavorite }),
        {
            onMutate: async (updatedStatus) => {
                await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ARTICLE, id] });
                await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ARTICLES] });
                const previousArticleData = queryClient.getQueryData<GetArticleResponse>([QueryKeys.GET_ARTICLE, id]);
                const previousArticlesData = queryClient.getQueriesData<GetArticlesQueriesData>([QueryKeys.GET_ARTICLES]);

                queryClient.setQueryData<GetArticleResponse>(
                    [QueryKeys.GET_ARTICLE, id],
                    (previousData) => previousData && { ...previousData, isFavorite: updatedStatus }
                );
                queryClient.setQueriesData<GetArticlesQueriesData>([QueryKeys.GET_ARTICLES], (previousData) => {
                    if (!previousData) {
                        return undefined;
                    }

                    return {
                        ...previousData,
                        pages: previousData.pages.map((page) => {
                            const updatedDataPage = page.data.map((article) =>
                                String(article.id) === id ? { ...article, isFavorite: updatedStatus } : article
                            );

                            return {
                                ...page,
                                data: updatedDataPage,
                            };
                        }),
                    };
                });
                return { previousArticleData, previousArticlesData };
            },
            onError: (err, _, context) => {
                let message = "";
                if (typeof context === "object" && "previousArticleData" in context) {
                    queryClient.setQueryData([QueryKeys.GET_ARTICLE, id], context.previousArticleData);
                }
                if (typeof context === "object" && "previousArticlesData" in context) {
                    queryClient.setQueriesData([QueryKeys.GET_ARTICLES], context.previousArticlesData);
                }

                if (typeof context === "object" && "previousArticleData" in context && context.previousArticleData) {
                    message = context.previousArticleData.isFavorite
                        ? `Ошибка удаления статьи ${context.previousArticleData.name} из избранных`
                        : `Ошибка добавления статьи ${context.previousArticleData.name} в избранное`;
                }

                if (typeof context === "object" && "previousArticlesData" in context) {
                    context.previousArticlesData.map((previewData) => {
                        return previewData[1]?.pages.map((page) => {
                            const foundedArticle = page.data.find((article) => String(article.id) === id);

                            if (!foundedArticle) {
                                return;
                            }

                            message = foundedArticle.isFavorite
                                ? `Ошибка удаления статьи ${foundedArticle.name} из избранных`
                                : `Ошибка добавления статьи ${foundedArticle.name} в избранное`;
                        });
                    });
                }
                createNotification({
                    type: ToastType.WARN,
                    title: message,
                });
            },
            onSettled() {
                queryClient.invalidateQueries([QueryKeys.GET_ARTICLES]);
            },
            onSuccess: (response) => {
                let articleName = queryClient.getQueryData<GetArticleResponse>([QueryKeys.GET_ARTICLE, id])?.name || "";

                queryClient.getQueriesData<GetArticlesQueriesData>([QueryKeys.GET_ARTICLES])?.[0]?.[1]?.pages.map((page) => {
                    const foundedArticle = page.data.find((article) => String(article.id) === id);

                    if (!foundedArticle) {
                        return;
                    }

                    articleName = foundedArticle.name;
                });

                const message = response.isFavorite
                    ? `Статья "${articleName}" успешно добавлена в избранные`
                    : `Статья "${articleName}" успешно удалена из избранных`;

                createNotification({
                    type: ToastType.INFO,
                    title: "Обновление избранных",
                    message: message,
                });
            },
        }
    );
};
