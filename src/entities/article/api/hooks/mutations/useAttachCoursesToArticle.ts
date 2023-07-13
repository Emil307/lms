import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { ToastType, createNotification } from "@shared/utils";
import { AttachCoursesToArticleRequest, AttachCoursesToArticleResponse, articleApi } from "@entities/article";

export const useAttachCoursesToArticle = (articleId: string) => {
    return useMutation<AttachCoursesToArticleResponse, AxiosError<FormErrorResponse>, Omit<AttachCoursesToArticleRequest, "articleId">>(
        [MutationKeys.ATTACH_COURSES_TO_ARTICLE, articleId],
        (params) => articleApi.attachCoursesToArticle({ ...params, articleId }),
        {
            onSuccess: () => {
                createNotification({
                    type: ToastType.SUCCESS,
                    title: "Курсы успешно привязаны к статье",
                });

                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_NO_ARTICLE_COURSES]);
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_ARTICLE_COURSES]);
            },
            onError: () => {
                createNotification({
                    type: ToastType.WARN,
                    title: "Ошибка привязки курсов к статье",
                });
            },
        }
    );
};
