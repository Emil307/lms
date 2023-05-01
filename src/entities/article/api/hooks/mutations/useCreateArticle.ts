import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AdminArticleDetails, CreateArticleRequest, articleApi } from "@entities/article";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";

export const useCreateArticle = () => {
    return useMutation<AdminArticleDetails, AxiosError<FormErrorResponse>, CreateArticleRequest>(
        [MutationKeys.CREATE_ARTICLE],
        (data) => articleApi.createArticle(data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_ARTICLES]);
            },
        }
    );
};
