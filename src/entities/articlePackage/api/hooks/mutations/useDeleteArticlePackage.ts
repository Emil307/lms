import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AdminArticlePackageDetails, GetAdminArticlePackagesResponse, articlePackageApi } from "@entities/articlePackage";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";

export const useDeleteArticlePackage = (id: string) => {
    return useMutation<void, AxiosError<FormErrorResponse>, null>(
        [MutationKeys.DELETE_ARTICLE_PACKAGE, id],
        () => articlePackageApi.deleteArticlePackage(id),
        {
            onSuccess: () => {
                const articlePackageData = queryClient.getQueryData<AdminArticlePackageDetails>([QueryKeys.GET_ADMIN_ARTICLE_PACKAGE, id]);
                const articlePackageFromList = queryClient
                    .getQueriesData<GetAdminArticlePackagesResponse>([QueryKeys.GET_ADMIN_ARTICLE_PACKAGES])[0]?.[1]
                    ?.data.find((articlePackage) => articlePackage.id.toString() === id);

                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Удаление пакета статей",
                    message: `Пакет статей "${articlePackageData?.name || articlePackageFromList?.name}" успешно удален`,
                });

                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_ARTICLE_PACKAGES]);
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка удаления пакета статей",
                });
            },
        }
    );
};
