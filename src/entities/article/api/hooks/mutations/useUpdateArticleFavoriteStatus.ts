import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
    ArticleFromList,
    GetArticleResponse,
    GetFavoriteArticleResponse,
    UpdateArticleFavoriteStatusRequest,
    UpdateArticleFavoriteStatusResponse,
    articleApi,
} from "@entities/article";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { queryClient } from "@app/providers";
import { TPaginationResponse, ToastType, createNotification } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";

type GetArticlesQueriesData = { pages: TPaginationResponse<ArticleFromList[]>[]; pageParams: Array<number | null> };

export const useUpdateArticleFavoriteStatus = ({
    id,
}: Pick<UpdateArticleFavoriteStatusRequest, "id">): UseMutationResult<
    UpdateArticleFavoriteStatusResponse,
    AxiosError<FormErrorResponse>,
    Omit<UpdateArticleFavoriteStatusRequest, "id">
> => {
    return useMutation([MutationKeys.UPDATE_ARTICLE_FAVORITE, id], (data) => articleApi.updateArticleFavoriteStatus({ ...data, id }), {
        onMutate: async ({ isFavorite }) => {
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ARTICLE, id] });
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ARTICLES] });
            //favorite
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_FAVORITE_ARTICLE, id] });
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_FAVORITE_ARTICLES] });

            const previousArticleData = queryClient.getQueryData<GetArticleResponse>([QueryKeys.GET_ARTICLE, id]);
            const previousArticlesData = queryClient.getQueriesData<GetArticlesQueriesData>([QueryKeys.GET_ARTICLES]);

            const previousFavoriteArticleData = queryClient.getQueryData<GetFavoriteArticleResponse>([QueryKeys.GET_FAVORITE_ARTICLE, id]);
            const previousFavoriteArticlesData = queryClient.getQueriesData<GetArticlesQueriesData>([QueryKeys.GET_FAVORITE_ARTICLES]);

            queryClient.setQueryData<GetArticleResponse>(
                [QueryKeys.GET_ARTICLE, id],
                (previousData) => previousData && { ...previousData, isFavorite },
            );
            queryClient.setQueriesData<GetArticlesQueriesData>([QueryKeys.GET_ARTICLES], (previousData) => {
                if (!previousData) {
                    return undefined;
                }

                return {
                    ...previousData,
                    pages: previousData.pages.map((page) => {
                        const updatedDataPage = page.data.map((article) =>
                            String(article.id) === id ? { ...article, isFavorite } : article,
                        );

                        return {
                            ...page,
                            data: updatedDataPage,
                        };
                    }),
                };
            });
            //favorite
            queryClient.setQueryData<GetFavoriteArticleResponse>(
                [QueryKeys.GET_FAVORITE_ARTICLE, id],
                (previousData) =>
                    previousData && {
                        ...previousData,
                        data: {
                            ...previousData.data,
                            isFavorite,
                        },
                    },
            );
            queryClient.setQueriesData<GetArticlesQueriesData>([QueryKeys.GET_FAVORITE_ARTICLES], (previousData) => {
                if (!previousData) {
                    return undefined;
                }

                return {
                    ...previousData,
                    pages: previousData.pages.map((page) => {
                        const updatedDataPage = page.data.map((article) =>
                            String(article.id) === id ? { ...article, isFavorite } : article,
                        );

                        return {
                            ...page,
                            data: updatedDataPage,
                        };
                    }),
                };
            });

            return { previousArticleData, previousArticlesData, previousFavoriteArticleData, previousFavoriteArticlesData };
        },
        onError: (err, _, context) => {
            let message = "";
            if (typeof context === "object" && "previousArticleData" in context) {
                queryClient.setQueryData([QueryKeys.GET_ARTICLE, id], context.previousArticleData);
                if (context.previousArticleData) {
                    message = context.previousArticleData.isFavorite
                        ? `Ошибка удаления статьи ${context.previousArticleData.name} из избранных`
                        : `Ошибка добавления статьи ${context.previousArticleData.name} в избранное`;
                }
            }
            if (typeof context === "object" && "previousArticlesData" in context) {
                queryClient.setQueriesData([QueryKeys.GET_ARTICLES], context.previousArticlesData);
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
            //favorite
            if (typeof context === "object" && "previousFavoriteArticleData" in context) {
                queryClient.setQueryData([QueryKeys.GET_FAVORITE_ARTICLE, id], context.previousFavoriteArticleData);
                if (context.previousFavoriteArticleData) {
                    message = context.previousFavoriteArticleData.data.isFavorite
                        ? `Ошибка удаления статьи ${context.previousFavoriteArticleData.data.name} из избранных`
                        : `Ошибка добавления статьи ${context.previousFavoriteArticleData.data.name} в избранное`;
                }
            }
            if (typeof context === "object" && "previousArticlesData" in context) {
                queryClient.setQueriesData([QueryKeys.GET_FAVORITE_ARTICLES], context.previousFavoriteArticlesData);
                context.previousFavoriteArticlesData.map((previewData) => {
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
            queryClient.invalidateQueries([QueryKeys.GET_FAVORITE_ARTICLES]);
        },
        onSuccess: ({ isFavorite }) => {
            const message = isFavorite ? `Статья успешно добавлена в избранные` : `Статья успешно удалена из избранных`;

            createNotification({
                type: ToastType.INFO,
                title: message,
            });
        },
    });
};
