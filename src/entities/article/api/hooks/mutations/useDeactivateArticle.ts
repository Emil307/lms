import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AdminArticleDetails, GetAdminArticlesResponse, articleApi } from "@entities/article";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { queryClient } from "@app/providers";

export const useDeactivateArticle = (id: string): UseMutationResult<unknown, unknown, void, unknown> => {
    return useMutation([MutationKeys.DEACTIVATE_ARTICLE], () => articleApi.deactivateArticle(id), {
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_ARTICLE, id] });
            await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_ARTICLES] });

            const previousArticleData = queryClient.getQueryData<AdminArticleDetails>([QueryKeys.GET_ADMIN_ARTICLE, id]);
            const previousArticlesData = queryClient.getQueriesData<GetAdminArticlesResponse>([QueryKeys.GET_ADMIN_ARTICLES]);

            queryClient.setQueryData<AdminArticleDetails>(
                [QueryKeys.GET_ADMIN_ARTICLE, id],
                (previousData) => previousData && { ...previousData, isActive: !previousData.isActive }
            );

            queryClient.setQueriesData<GetAdminArticlesResponse>([QueryKeys.GET_ADMIN_ARTICLES], (previousData) => {
                if (!previousData) {
                    return undefined;
                }

                return {
                    ...previousData,
                    data: previousData.data.map((article) => (String(article.id) === id ? { ...article, isActive: false } : article)),
                };
            });

            return { previousArticleData, previousArticlesData };
        },
        onError: (err, _, context) => {
            if (typeof context === "object" && "previousArticleData" in context) {
                queryClient.setQueryData<AdminArticleDetails>(
                    [QueryKeys.GET_ADMIN_ARTICLE, id],
                    context.previousArticleData as AdminArticleDetails
                );
            }
            if (typeof context === "object" && "previousArticlesData" in context) {
                queryClient.setQueriesData([QueryKeys.GET_ADMIN_ARTICLES], context.previousArticlesData);
            }
        },
    });
};
