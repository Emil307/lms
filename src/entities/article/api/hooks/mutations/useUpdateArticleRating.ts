import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
    ArticleFromList,
    DeleteArticleRatingResponse,
    GetArticleResponse,
    UpdateArticleRatingResponse,
    UserRating,
    articleApi,
} from "@entities/article";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { queryClient } from "@app/providers";
import { TPaginationResponse, ToastType, createNotification } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";

type GetArticlesQueriesData = { pages: TPaginationResponse<ArticleFromList[]>[]; pageParams: Array<number | null> };

export const useUpdateArticleRating = (
    id: string,
): UseMutationResult<
    UpdateArticleRatingResponse | DeleteArticleRatingResponse,
    AxiosError<FormErrorResponse>,
    UserRating | null,
    unknown
> => {
    return useMutation(
        [MutationKeys.UPDATE_ARTICLE_RATING, id],
        (status: UserRating | null) => {
            if (!status) {
                return articleApi.deleteArticleRating({ id });
            }
            return articleApi.updateArticleRating({ id, status });
        },
        {
            onMutate: async (updatedStatus) => {
                await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ARTICLE, id] });
                await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ARTICLES] });
                const previousArticleData = queryClient.getQueryData<GetArticleResponse>([QueryKeys.GET_ARTICLE, id]);
                const previousArticlesData = queryClient.getQueriesData<GetArticlesQueriesData>([QueryKeys.GET_ARTICLES]);

                queryClient.setQueryData<GetArticleResponse>(
                    [QueryKeys.GET_ARTICLE, id],
                    (previousData) => previousData && { ...previousData, userRating: updatedStatus },
                );
                queryClient.setQueriesData<GetArticlesQueriesData>([QueryKeys.GET_ARTICLES], (previousData) => {
                    if (!previousData) {
                        return undefined;
                    }

                    return {
                        ...previousData,
                        pages: previousData.pages.map((page) => {
                            const updatedDataPage = page.data.map((article) =>
                                String(article.id) === id ? { ...article, userRating: updatedStatus } : article,
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
                if (typeof context === "object" && "previousArticleData" in context) {
                    queryClient.setQueryData([QueryKeys.GET_ARTICLE, id], context.previousArticleData);
                }
                if (typeof context === "object" && "previousArticlesData" in context) {
                    queryClient.setQueriesData([QueryKeys.GET_ARTICLES], context.previousArticlesData);
                }
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка изменения реакции",
                });
            },
            onSettled() {
                queryClient.invalidateQueries([QueryKeys.GET_ARTICLES]);
            },
            onSuccess: () => {
                createNotification({
                    type: ToastType.INFO,
                    title: "Изменение реации ",
                    message: `Ваша реакция обновлена.`,
                });
            },
        },
    );
};
