import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { queryClient } from "@app/providers";
import {
    AdminArticlePackageDetails,
    GetAdminArticlePackagesResponse,
    UpdateActivityStatusArticlePackageResponse,
    articlePackageApi,
} from "@entities/articlePackage";
import { ToastType, createNotification } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";

export const useUpdateActivityArticlePackage = (
    id: string
): UseMutationResult<UpdateActivityStatusArticlePackageResponse, AxiosError<FormErrorResponse>, boolean, unknown> => {
    return useMutation(
        [MutationKeys.UPDATE_ACTIVITY_ARTICLE_PACKAGE, id],
        (isActive: boolean) => articlePackageApi.updateActivityStatusArticlePackage({ id, isActive }),
        {
            onMutate: async (updatedStatus) => {
                await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_ARTICLE_PACKAGE, id] });
                await queryClient.cancelQueries({ queryKey: [QueryKeys.GET_ADMIN_ARTICLE_PACKAGES] });

                const previousArticlePackageData = queryClient.getQueryData<AdminArticlePackageDetails>([
                    QueryKeys.GET_ADMIN_ARTICLE_PACKAGE,
                    id,
                ]);
                const previousArticlePackagesData = queryClient.getQueriesData<GetAdminArticlePackagesResponse>([
                    QueryKeys.GET_ADMIN_ARTICLE_PACKAGES,
                ]);

                queryClient.setQueryData<AdminArticlePackageDetails>(
                    [QueryKeys.GET_ADMIN_ARTICLE_PACKAGE, id],
                    (previousData) => previousData && { ...previousData, isActive: updatedStatus }
                );

                queryClient.setQueriesData<GetAdminArticlePackagesResponse>([QueryKeys.GET_ADMIN_ARTICLE_PACKAGES], (previousData) => {
                    if (!previousData) {
                        return undefined;
                    }

                    return {
                        ...previousData,
                        data: previousData.data.map((articlePackage) =>
                            String(articlePackage.id) === id ? { ...articlePackage, isActive: updatedStatus } : articlePackage
                        ),
                    };
                });

                return { previousArticlePackageData, previousArticlePackagesData };
            },
            onError: (err, _, context) => {
                if (typeof context === "object" && "previousArticlePackageData" in context) {
                    queryClient.setQueryData([QueryKeys.GET_ADMIN_ARTICLE_PACKAGE, id], context.previousArticlePackageData);
                }
                if (typeof context === "object" && "previousArticlePackagesData" in context) {
                    queryClient.setQueriesData([QueryKeys.GET_ADMIN_ARTICLE_PACKAGES], context.previousArticlePackagesData);
                }

                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка изменения статуса",
                });
            },
            onSettled() {
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_ARTICLE_PACKAGES]);
            },
            onSuccess: () => {
                const articlePackageData = queryClient.getQueryData<AdminArticlePackageDetails>([QueryKeys.GET_ADMIN_ARTICLE_PACKAGE, id]);
                const articlePackageFromList = queryClient
                    .getQueriesData<GetAdminArticlePackagesResponse>([QueryKeys.GET_ADMIN_ARTICLE_PACKAGES])?.[0]?.[1]
                    ?.data.find((articlePackage) => articlePackage.id.toString() === id);

                const statusMessage = articlePackageData?.isActive || articlePackageFromList?.isActive ? "активирован" : "деактивирован";

                createNotification({
                    type: ToastType.INFO,
                    title: "Изменение статуса",
                    message: `Пакет статей "${articlePackageData?.name || articlePackageFromList?.name}" ${statusMessage}.`,
                });
            },
        }
    );
};