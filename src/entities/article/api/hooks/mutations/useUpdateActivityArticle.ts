import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AdminArticleDetails, GetAdminArticlesResponse, UpdateActivityStatusArticleResponse, articleApi } from "@entities/article";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { queryClient } from "@app/providers";

export const useUpdateActivityArticle = (id: string): UseMutationResult<UpdateActivityStatusArticleResponse, unknown, boolean, unknown> => {
    return useMutation(
        [MutationKeys.UPDATE_ACTIVITY_ARTICLE, id],
        (isActive: boolean) => articleApi.updateActivityStatusArticle({ id, isActive }),
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
            },
            onSettled() {
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_ARTICLES]);
            },
        }
    );
};
