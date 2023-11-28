import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GetAdminArticlePackageResponse, GetAdminArticlePackagesResponse, articlePackageApi } from "@entities/articlePackage";
import { EntityNames, MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification, invalidateQueriesWithPredicate } from "@shared/utils";

export const useDeleteArticlePackage = (id: string): UseMutationResult<void, AxiosError<FormErrorResponse>, null> => {
    return useMutation([MutationKeys.DELETE_ARTICLE_PACKAGE, id], () => articlePackageApi.deleteArticlePackage(id), {
        onSuccess: () => {
            const articlePackageData = queryClient.getQueryData<GetAdminArticlePackageResponse>([
                QueryKeys.GET_ADMIN_ARTICLE_PACKAGE,
                [EntityNames.ARTICLE_PACKAGE, EntityNames.CATEGORY, EntityNames.TAG, EntityNames.USER],
                id,
            ]);
            const articlePackageFromList = queryClient
                .getQueriesData<GetAdminArticlePackagesResponse>([
                    QueryKeys.GET_ADMIN_ARTICLE_PACKAGES,
                    [EntityNames.ARTICLE_PACKAGE, EntityNames.CATEGORY],
                ])[0]?.[1]
                ?.data.find((articlePackage) => articlePackage.id.toString() === id);

            createNotification({
                type: ToastType.SUCCESS,
                title: "Удаление пакета статей",
                message: `Пакет статей "${articlePackageData?.name || articlePackageFromList?.name}" успешно удален`,
            });

            invalidateQueriesWithPredicate({ entityName: EntityNames.ARTICLE_PACKAGE, exclude: [QueryKeys.GET_ADMIN_ARTICLE_PACKAGE] });
        },
        onError: () => {
            createNotification({
                type: ToastType.WARN,
                title: "Ошибка удаления пакета статей",
            });
        },
    });
};
