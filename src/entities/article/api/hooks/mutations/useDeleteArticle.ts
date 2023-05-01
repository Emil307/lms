import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { articleApi } from "@entities/article";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";

export const useDeleteArticle = (id: string) => {
    return useMutation<void, AxiosError<FormErrorResponse>, null>([MutationKeys.DELETE_ARTICLE, id], () => articleApi.deleteArticle(id), {
        onSuccess: () => {
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_ARTICLES]);
        },
    });
};
