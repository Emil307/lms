import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AdminArticlePackageDetails, CreateAdminArticlePackageRequest, articlePackageApi } from "@entities/articlePackage";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";

export const useCreateArticlePackage = () => {
    return useMutation<AdminArticlePackageDetails, AxiosError<FormErrorResponse>, CreateAdminArticlePackageRequest>(
        [MutationKeys.CREATE_ARTICLE_PACKAGE],
        (data: CreateAdminArticlePackageRequest) => articlePackageApi.createAdminArticlePackage(data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_ARTICLE_PACKAGES]);

                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Создание пакета",
                    message: "Пакет успешно создан",
                });
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка создания пакета",
                });
            },
        }
    );
};
