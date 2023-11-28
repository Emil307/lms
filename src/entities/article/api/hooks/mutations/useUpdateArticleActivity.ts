import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
    GetAdminArticleResponse,
    GetAdminArticlesResponse,
    UpdateArticleActivityRequest,
    UpdateArticleActivityResponse,
    articleApi,
} from "@entities/article";
import { EntityNames, MutationKeys, QueryKeys } from "@shared/constant";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";

export const useUpdateArticleActivity = ({
    id,
    name,
}: Pick<UpdateArticleActivityRequest, "id"> & { name?: string }): UseMutationResult<
    UpdateArticleActivityResponse,
    AxiosError<FormErrorResponse>,
    Omit<UpdateArticleActivityRequest, "id">,
    unknown
> => {
    return useMutation([MutationKeys.UPDATE_ARTICLE_ACTIVITY, id], (data) => articleApi.updateArticleActivity({ ...data, id }), {
        onMutate: async ({ isActive }) => {
            await queryClient.cancelQueries({
                queryKey: [QueryKeys.GET_ADMIN_ARTICLE, [EntityNames.ARTICLE, EntityNames.CATEGORY, EntityNames.TAG, EntityNames.USER], id],
            });
            await queryClient.cancelQueries({
                queryKey: [QueryKeys.GET_ADMIN_ARTICLES, [EntityNames.ARTICLE, EntityNames.CATEGORY, EntityNames.COURSE]],
            });
            await queryClient.cancelQueries({
                queryKey: [QueryKeys.GET_ADMIN_COURSE_ARTICLES, [EntityNames.ARTICLE, EntityNames.CATEGORY, EntityNames.COURSE]],
            });

            const previousArticleData = queryClient.getQueryData<GetAdminArticleResponse>([
                QueryKeys.GET_ADMIN_ARTICLE,
                [EntityNames.ARTICLE, EntityNames.CATEGORY, EntityNames.TAG, EntityNames.USER],
                id,
            ]);
            const previousArticlesData = queryClient.getQueriesData<GetAdminArticlesResponse>([
                QueryKeys.GET_ADMIN_ARTICLES,
                [EntityNames.ARTICLE, EntityNames.CATEGORY, EntityNames.COURSE],
            ]);
            const previousCourseArticlesData = queryClient.getQueriesData<GetAdminArticlesResponse>([
                QueryKeys.GET_ADMIN_COURSE_ARTICLES,
                [EntityNames.ARTICLE, EntityNames.CATEGORY, EntityNames.COURSE],
            ]);

            queryClient.setQueryData<GetAdminArticleResponse>(
                [QueryKeys.GET_ADMIN_ARTICLE, [EntityNames.ARTICLE, EntityNames.CATEGORY, EntityNames.TAG, EntityNames.USER], id],
                (previousData) => previousData && { ...previousData, isActive }
            );

            queryClient.setQueriesData<GetAdminArticlesResponse>(
                [QueryKeys.GET_ADMIN_ARTICLES, [EntityNames.ARTICLE, EntityNames.CATEGORY, EntityNames.COURSE]],
                (previousData) => {
                    if (!previousData) {
                        return undefined;
                    }

                    return {
                        ...previousData,
                        data: previousData.data.map((article) => (String(article.id) === id ? { ...article, isActive } : article)),
                    };
                }
            );

            queryClient.setQueriesData<GetAdminArticlesResponse>(
                [QueryKeys.GET_ADMIN_COURSE_ARTICLES, [EntityNames.ARTICLE, EntityNames.CATEGORY, EntityNames.COURSE]],
                (previousData) => {
                    if (!previousData) {
                        return undefined;
                    }

                    return {
                        ...previousData,
                        data: previousData.data.map((article) => (String(article.id) === id ? { ...article, isActive } : article)),
                    };
                }
            );

            return { previousArticleData, previousArticlesData, previousCourseArticlesData };
        },
        onError: (err, _, context) => {
            if (typeof context === "object" && "previousArticleData" in context) {
                queryClient.setQueryData(
                    [QueryKeys.GET_ADMIN_ARTICLE, [EntityNames.ARTICLE, EntityNames.CATEGORY, EntityNames.TAG, EntityNames.USER], id],
                    context.previousArticleData
                );
            }
            if (typeof context === "object" && "previousArticlesData" in context) {
                queryClient.setQueriesData(
                    [QueryKeys.GET_ADMIN_ARTICLES, [EntityNames.ARTICLE, EntityNames.CATEGORY, EntityNames.COURSE]],
                    context.previousArticlesData
                );
            }

            if (typeof context === "object" && "previousCourseArticlesData" in context) {
                queryClient.setQueriesData(
                    [QueryKeys.GET_ADMIN_COURSE_ARTICLES, [EntityNames.ARTICLE, EntityNames.CATEGORY, EntityNames.COURSE]],
                    context.previousCourseArticlesData
                );
            }

            createNotification({
                type: ToastType.WARN,
                title: "Ошибка изменения статуса",
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries([
                QueryKeys.GET_ADMIN_ARTICLE,
                [EntityNames.ARTICLE, EntityNames.CATEGORY, EntityNames.TAG, EntityNames.USER],
                id,
            ]);
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_ARTICLES]);
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_ARTICLES_INFINITY]);
            //[entityName] has article
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_NO_COURSE_ARTICLES]);
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_COURSE_ARTICLES]);
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_ARTICLES_FROM_ARTICLE_PACKAGE]);
        },
        onSuccess: ({ isActive }) => {
            const statusMessage = isActive ? "активирована" : "деактивирована";

            createNotification({
                type: ToastType.INFO,
                title: "Изменение статуса",
                message: `Статья "${name}" ${statusMessage}.`,
            });
        },
    });
};
