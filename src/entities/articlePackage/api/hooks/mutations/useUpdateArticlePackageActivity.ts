import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, MutationKeys, QueryKeys } from "@shared/constant";
import { queryClient } from "@app/providers";
import {
    GetAdminArticlePackageResponse,
    GetAdminArticlePackagesResponse,
    UpdateArticlePackageActivityRequest,
    UpdateArticlePackageActivityResponse,
    articlePackageApi,
} from "@entities/articlePackage";
import { ToastType, createNotification } from "@shared/utils";
import { FormErrorResponse } from "@shared/types";

interface UseUpdateArticlePackageActivityProps extends Pick<UpdateArticlePackageActivityRequest, "id"> {
    name: string;
}

export const useUpdateArticlePackageActivity = ({
    id,
    name,
}: UseUpdateArticlePackageActivityProps): UseMutationResult<
    UpdateArticlePackageActivityResponse,
    AxiosError<FormErrorResponse>,
    Omit<UpdateArticlePackageActivityRequest, "id">
> => {
    return useMutation(
        [MutationKeys.UPDATE_ARTICLE_PACKAGE_ACTIVITY],
        (data) => articlePackageApi.updateArticlePackageActivity({ ...data, id }),
        {
            onMutate: async ({ isActive }) => {
                await queryClient.cancelQueries({
                    queryKey: [
                        QueryKeys.GET_ADMIN_ARTICLE_PACKAGE,
                        [EntityNames.ARTICLE_PACKAGE, EntityNames.CATEGORY, EntityNames.TAG, EntityNames.USER],
                        id,
                    ],
                });
                await queryClient.cancelQueries({
                    queryKey: [QueryKeys.GET_ADMIN_ARTICLE_PACKAGES, [EntityNames.ARTICLE_PACKAGE, EntityNames.CATEGORY]],
                });

                const previousArticlePackageData = queryClient.getQueryData<GetAdminArticlePackageResponse>([
                    QueryKeys.GET_ADMIN_ARTICLE_PACKAGE,
                    [EntityNames.ARTICLE_PACKAGE, EntityNames.CATEGORY, EntityNames.TAG, EntityNames.USER],
                    id,
                ]);
                const previousArticlePackagesData = queryClient.getQueriesData<GetAdminArticlePackagesResponse>([
                    QueryKeys.GET_ADMIN_ARTICLE_PACKAGES,
                    [EntityNames.ARTICLE_PACKAGE, EntityNames.CATEGORY],
                ]);

                queryClient.setQueryData<GetAdminArticlePackageResponse>(
                    [
                        QueryKeys.GET_ADMIN_ARTICLE_PACKAGE,
                        [EntityNames.ARTICLE_PACKAGE, EntityNames.CATEGORY, EntityNames.TAG, EntityNames.USER],
                        id,
                    ],
                    (previousData) => previousData && { ...previousData, isActive }
                );

                queryClient.setQueriesData<GetAdminArticlePackagesResponse>(
                    [QueryKeys.GET_ADMIN_ARTICLE_PACKAGES, [EntityNames.ARTICLE_PACKAGE, EntityNames.CATEGORY]],
                    (previousData) => {
                        if (!previousData) {
                            return undefined;
                        }

                        return {
                            ...previousData,
                            data: previousData.data.map((articlePackage) =>
                                String(articlePackage.id) === id ? { ...articlePackage, isActive } : articlePackage
                            ),
                        };
                    }
                );

                return { previousArticlePackageData, previousArticlePackagesData };
            },
            onError: (err, _, context) => {
                if (typeof context === "object" && "previousArticlePackageData" in context) {
                    queryClient.setQueryData(
                        [
                            QueryKeys.GET_ADMIN_ARTICLE_PACKAGE,
                            [EntityNames.ARTICLE_PACKAGE, EntityNames.CATEGORY, EntityNames.TAG, EntityNames.USER],
                            id,
                        ],
                        context.previousArticlePackageData
                    );
                }
                if (typeof context === "object" && "previousArticlePackagesData" in context) {
                    queryClient.setQueriesData(
                        [QueryKeys.GET_ADMIN_ARTICLE_PACKAGES, [EntityNames.ARTICLE_PACKAGE, EntityNames.CATEGORY]],
                        context.previousArticlePackagesData
                    );
                }

                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка изменения статуса",
                });
            },
            onSettled() {
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_ARTICLE_PACKAGES]);
            },
            onSuccess: ({ isActive }) => {
                const statusMessage = isActive ? "активирован" : "деактивирован";

                createNotification({
                    type: ToastType.INFO,
                    title: "Изменение статуса",
                    message: `Пакет статей "${name}" ${statusMessage}.`,
                });
            },
        }
    );
};
