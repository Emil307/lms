import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
    ArticleFromList,
    GetArticleByCategoryResponse,
    GetArticleResponse,
    GetFavoriteArticleResponse,
    GetMyArticleResponse,
    UpdateArticleFavoriteStatusRequest,
    UpdateArticleFavoriteStatusResponse,
    articleApi,
} from "@entities/article";
import { ArticleTypes, EntityNames, MutationKeys, QueryKeys } from "@shared/constant";
import { queryClient } from "@app/providers";
import { TPaginationResponse, ToastType, createNotification } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";

type GetArticlesQueriesData = { pages: TPaginationResponse<ArticleFromList[]>[]; pageParams: Array<number | null> };

interface UseUpdateArticleFavoriteStatusProps extends Pick<UpdateArticleFavoriteStatusRequest, "id"> {
    articleType?: ArticleTypes;
    categoryId?: string;
}

export const useUpdateArticleFavoriteStatus = ({
    id,
    articleType,
    categoryId,
}: UseUpdateArticleFavoriteStatusProps): UseMutationResult<
    UpdateArticleFavoriteStatusResponse,
    AxiosError<FormErrorResponse>,
    Omit<UpdateArticleFavoriteStatusRequest, "id">
> => {
    const queryParamsArticle = [articleType, id, categoryId].filter((item) => !!item);

    const updateArticleData = (isFavorite: boolean) => {
        if (articleType) {
            queryClient.setQueryData<GetArticleByCategoryResponse | GetFavoriteArticleResponse | GetMyArticleResponse>(
                [
                    QueryKeys.GET_ARTICLE,
                    [EntityNames.ARTICLE, EntityNames.CATEGORY, EntityNames.TAG, EntityNames.MATERIAL],
                    ...queryParamsArticle,
                ],
                (previousData) => previousData && { ...previousData, data: { ...previousData.data, isFavorite } }
            );
        }

        queryClient.setQueryData<GetArticleResponse>(
            [QueryKeys.GET_ARTICLE, [EntityNames.ARTICLE, EntityNames.CATEGORY, EntityNames.TAG, EntityNames.MATERIAL], id],
            (previousData) => previousData && { ...previousData, isFavorite }
        );

        queryClient.setQueriesData<GetArticlesQueriesData>([QueryKeys.GET_ARTICLES], (previousData) => {
            if (!previousData) {
                return undefined;
            }

            return {
                ...previousData,
                pages: previousData.pages.map((page) => ({
                    ...page,
                    data: page.data.map((article) => (String(article.id) === id ? { ...article, isFavorite } : article)),
                })),
            };
        });
    };

    const restorePreviousData = (context: any, id: string) => {
        let message = "";
        if (context.previousArticleData) {
            queryClient.setQueryData(
                [
                    QueryKeys.GET_ARTICLE,
                    [EntityNames.ARTICLE, EntityNames.CATEGORY, EntityNames.TAG, EntityNames.MATERIAL],
                    ...queryParamsArticle,
                ],
                context.previousArticleData
            );
            message = context.previousArticleData.isFavorite
                ? `Ошибка удаления статьи ${context.previousArticleData.name} из избранных`
                : `Ошибка добавления статьи ${context.previousArticleData.name} в избранное`;
        }

        if (context.previousArticlesData) {
            queryClient.setQueriesData([QueryKeys.GET_ARTICLES], context.previousArticlesData);
            context.previousArticlesData.forEach((previewData: GetArticlesQueriesData[]) => {
                previewData[1]?.pages.forEach((page) => {
                    const foundedArticle = page.data.find((article) => String(article.id) === id);

                    if (foundedArticle) {
                        message = foundedArticle.isFavorite
                            ? `Ошибка удаления статьи ${foundedArticle.name} из избранных`
                            : `Ошибка добавления статьи ${foundedArticle.name} в избранное`;
                    }
                });
            });
        }

        return message;
    };

    return useMutation(
        [MutationKeys.UPDATE_ARTICLE_FAVORITE, ...queryParamsArticle],
        (data) => articleApi.updateArticleFavoriteStatus({ ...data, id }),
        {
            onMutate: async ({ isFavorite }) => {
                await queryClient.cancelQueries({
                    queryKey: [
                        QueryKeys.GET_ARTICLE,
                        [EntityNames.ARTICLE, EntityNames.CATEGORY, EntityNames.TAG, EntityNames.MATERIAL],
                        ...queryParamsArticle,
                    ],
                });
                await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ARTICLES] });

                const previousArticleData = queryClient.getQueryData<
                    GetArticleResponse | GetArticleByCategoryResponse | GetFavoriteArticleResponse | GetMyArticleResponse
                >([
                    QueryKeys.GET_ARTICLE,
                    [EntityNames.ARTICLE, EntityNames.CATEGORY, EntityNames.TAG, EntityNames.MATERIAL],
                    ...queryParamsArticle,
                ]);
                const previousArticlesData = queryClient.getQueriesData<GetArticlesQueriesData>([QueryKeys.GET_ARTICLES]);

                updateArticleData(isFavorite);

                return { previousArticleData, previousArticlesData };
            },
            onError: (err, _, context) => {
                const message = restorePreviousData(context, id);

                createNotification({
                    type: ToastType.WARN,
                    title: message,
                });
            },
            onSettled() {
                queryClient.invalidateQueries([QueryKeys.GET_ARTICLES]);
                queryClient.invalidateQueries([QueryKeys.GET_ARTICLE]);
            },
            onSuccess: ({ isFavorite }) => {
                const message = isFavorite ? `Статья успешно добавлена в избранные` : `Статья успешно удалена из избранных`;

                createNotification({
                    type: ToastType.INFO,
                    title: message,
                });
            },
        }
    );
};
