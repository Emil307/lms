import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";
import { AttachMaterialFilesToArticleRequest, AttachMaterialFilesToArticleResponse, articleApi } from "@entities/article";

export const useAttachMaterialFilesToArticle = (
    articleId: string
): UseMutationResult<
    AttachMaterialFilesToArticleResponse,
    AxiosError<FormErrorResponse>,
    Omit<AttachMaterialFilesToArticleRequest, "articleId">
> => {
    return useMutation(
        [MutationKeys.ATTACH_MATERIALS_TO_ARTICLE, articleId],
        (params) => articleApi.attachMaterialFilesToArticle({ ...params, articleId }),
        {
            onSuccess: () => {
                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Материалы успешно добавлены к статье",
                });

                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_NO_ARTICLE_MATERIALS]);
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_ARTICLE_MATERIALS]);
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка добавления материалов к статье",
                });
            },
        }
    );
};
