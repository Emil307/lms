import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";
import { AttachArticleToPackageRequest, articlePackageApi } from "@entities/articlePackage";

export const useAttachArticleToArticlePackage = (articlePackageId: string) => {
    return useMutation<void, AxiosError<FormErrorResponse>, Omit<AttachArticleToPackageRequest, "articlePackageId">>(
        [MutationKeys.ATTACH_ARTICLE_TO_ARTICLE_PACKAGE, articlePackageId],
        (params) => articlePackageApi.attachArticleToArticlePackage({ ...params, articlePackageId }),
        {
            onSuccess: () => {
                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Статьи успешно добавлены в пакет",
                });

                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_ARTICLES_FROM_ARTICLE_PACKAGE]);
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_ARTICLES]);
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка добавления статей в пакет",
                });
            },
        }
    );
};
